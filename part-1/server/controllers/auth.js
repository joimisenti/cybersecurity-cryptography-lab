const users = []

const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      let userData

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) { // Check if user in the array
        // removed condition: && users[i].password === password
          userData = users[i]
          // res.status(200).send(users[i])
        // } else { 
        //   res.status(400).send("User not found.")
        // }
      }

      if (!userData) {
        res.status(200).send({success: false, message: 'bad username'})
      } else {
        bcrypt.compare(password, userData.passwordHash, (err, result) => {
          if (!err) {
            if (result) {
              delete userData.passwordHash
              const userIntro = "Your username is "
              console.log(userData)
              res.status(200).send({success: true, username: userData.username, intro: userIntro})
            } else {
              res.status(200).send({success:false, message: 'bad password or username'})
            }
          } else {
            console.log(`Error during bcrypt.compare(): ` + err)
            res.status(400).send({success: false})
          }
        })
      }
    }
  },
    register: (req, res) => {
      console.log(req.body)
      const { username, email, password, firstName, lastName } = req.body
      const saltRounds = 10;
      
      bcrypt.hash(password, saltRounds, (err, passwordHash) => {
        let newUserEntry = {};
        newUserEntry.username = username;
        newUserEntry.email = email;
        newUserEntry.firstName = firstName;
        newUserEntry.lastName = lastName;
        newUserEntry.passwordHash = passwordHash;
        console.log('Registering User')
        console.log(newUserEntry)
        users.push(newUserEntry)
        res.status(200).send(newUserEntry)
        })
        // users.push(req.body)
        // res.status(200).send(req.body)
    }
}