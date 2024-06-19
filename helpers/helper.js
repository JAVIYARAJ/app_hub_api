class Helper{

    static generateUsername(firstName,lastName){
        // Remove any non-alphanumeric characters and convert to lowercase
        const cleanFirstName = firstName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const cleanLastName = lastName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        // Combine parts of the first name and last name
        let username = `${cleanFirstName}${cleanLastName}`;

        // Ensure a minimum length for the username by truncating or padding
        if (username.length > 15) {
            username = username.substring(0, 15);
        } else if (username.length < 3) {
            username = username.padEnd(3, 'x');
        }
        const randomSuffix = Math.floor(Math.random() * 1000);
        const uniqueUsername = `${username}${randomSuffix}`;

        return uniqueUsername
    }

    static generateRandomUsername(firstName, lastName) {
        // 1. Combine first and last name (lowercase, remove spaces)
        let baseUsername = firstName.toLowerCase().replace(/\s/g, "") + lastName.toLowerCase().replace(/\s/g, "");
        
        // 2. Generate random number (3 digits)
        const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
      
        // 3. Choose a random variation (prefix, suffix, or combination)
        const variations = [
          // Prefix variations
          () => baseUsername + randomNumber,      
          // Suffix variations
          () => baseUsername.slice(0, Math.floor(baseUsername.length / 2)) + randomNumber,
          () => randomNumber + baseUsername.slice(Math.floor(baseUsername.length / 2)),
      
          // Combination variations (optional, uncomment if desired)
          
          () => baseUsername.slice(0, 2) + randomNumber + baseUsername.slice(2),
          () => randomNumber + baseUsername.slice(0, -2) + baseUsername.slice(-2)
          
        ];
      
        const randomVariation = variations[Math.floor(Math.random() * variations.length)];
      
        // 4. Generate the final username
        const username = randomVariation();
      
        return username;
      }
}

module.exports={Helper}