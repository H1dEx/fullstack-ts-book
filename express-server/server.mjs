import express from 'express';
import bodyParser from 'body-parser'
const app = express();

app.use(bodyParser.json())

const router = express.Router();

app.use((req, res, next) => {
    console.log('First middleware');
    next()
});

app.use(router);

router.get('/api/v1/users', (req, res, next) => {
    const users = [
        { name: 'valera', profession: 'slesar', id: 1 },
        { name: 'john', profession: 'bastard', id: 2 },
        { name: 'leha', profession: 'investor', id: 3 }
    ]
    const id = req.query.userid;
    const user = users.find(el => el.id == id);
    res.send(`Current user is ${user?.name}, proffesion is ${user?.profession}`)
})

router.post('/api/v1/groups', (req, res, next) => {
    const groups = [
        { id: 1, groupname: 'King' },
        { id: 2, groupname: 'Rapper' },
        { id: 3, groupname: 'Rap God' }
    ]
    const id = req.body.groupid;
    const group = groups.find(el => el.id == id);
    res.send(`Group ${group.groupname}`);
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    res.send('Yo, there is post method!')
})

app.listen({ port: 2000 }, () => {
    console.log('server started...');
})

app.use((err, req, res, next) => {
    res.status(500).send(e.message)
})