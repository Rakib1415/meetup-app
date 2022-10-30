
import { MongoClient } from 'mongodb';
 async function handler(req, res){
    if(req.method === 'POST'){
        try{
            const formData = req.body;
            const {title, image, address, description} = formData;
            const client = await MongoClient.connect('mongodb+srv://dbUser:W7szCpR6QTu4FztB@cluster0.yvtemfj.mongodb.net/?retryWrites=true&w=majority');
            const meetupCollection = client.db().collection('meetups');
            const result = await meetupCollection.insertOne(formData);
            client.close();
            console.log(result);

            res.status(201).json({message : 'Success'});
        }catch(e){
            console.log(e);
        }
    }
}

export default handler;