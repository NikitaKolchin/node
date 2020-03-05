// users hardcoded for simplicity, store in a db for production applications
const stakes = [{ id: 1, username: 'staker1', password: 'test', firstName: 'Test', lastName: 'User' }, 
{ id: 2, username: 'staker2', password: 'test', firstName: 'Nik', lastName: 'Kolch' }];

async function getAllStakes() {
    return stakes.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

module.exports =  {getAllStakes};