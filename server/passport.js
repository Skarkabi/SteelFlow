import Bluebird from 'bluebird';
const LocalStrategy = require('passport-local').Strategy;
import userQueries from './models/User/User';
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => Bluebird.resolve()
    .then(async () => {
      const dbUser = await userQueries.getUserById(id);
      const user = 
        { 
          username: dbUser.username,
          id: id,
          profilePicture : dbUser.profilePicture,
          manager : dbUser.Work_For.managerId,
          accountType : dbUser.accountType,
          department : dbUser.department,
          division : dbUser.division,
        } 
      Object.assign(user, getUserType(dbUser))
      done(null, user);
    })
    .catch(done));

  passport.use('local', new LocalStrategy(
    {
      usernameField: 'fName',
      passwordField: 'lName',
      passReqToCallback: true,
    },
    (req, firstName, lastName, done) => Bluebird.resolve()
      .then(async () => {
        const user = await userQueries.getUserById(firstName);
        if (!user || !await user.comparePassword(lastName)) {
          return done(null, null);
        }
        return done(null, user);
      })
      .catch(done),
  ));

  function getUserType(user)
	{
		const result = {};

		if (user.userType === "admin")
		{
			result.admin = true;
		}
		else if (user.userType === "employee")
		{
			result.employee = true;
		}
		
		return result;
	}
};