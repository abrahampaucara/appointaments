import server from './server';
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from './config/data-source';
import { preloadData } from './helpers/preloadData';

AppDataSource.initialize().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

// AppDataSource.initialize()
//     .then(res => {
//         console.log("Database connected");
//         preloadData()
//             .then(res => {
//                 server.listen(PORT, () => {
//                     console.log(`Server is listening on port ${PORT}`);
//                 });
//             })
// })

