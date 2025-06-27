import Sequelize from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize('FEBE', 'root', '123456', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
});
 let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
};

export default connectDB;
