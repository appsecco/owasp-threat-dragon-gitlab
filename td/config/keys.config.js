module.exports = {
	ClientID: process.env.CLIENT_ID,
	ClientSecret: process.env.CLIENT_SECRET,
	sessionSecret: process.env.SESSION_SECRET,
	encryptionKeys: '[{\"isPrimary\": true, \"id\": 1, \"value\": \"' + process.env.ENCRYPTION_KEY + '"\}]'
}