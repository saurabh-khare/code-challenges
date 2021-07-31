import { app } from './app';

const start = () => {
    app.listen(3000, () => {
        console.log('Text service started on port 3000');
    });
};

start();
