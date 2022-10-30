import { MongoClient, ObjectId } from 'mongodb';
import MeetupItem from '../../components/meetups/MeetupItem';
const MeetupDetailsPage = (props) => {
    return (
        <MeetupItem show ={false} image={props.meetup.image} title ={props.meetup.title} address = {props.meetup.address} description={props.meetup.description}/>
    )
};

export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://dbUser:W7szCpR6QTu4FztB@cluster0.yvtemfj.mongodb.net/?retryWrites=true&w=majority');
    const meetupCollection = client.db().collection('meetups');
    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
    client.close();
    return {
        fallback : false,
        paths : meetups.map(meetup => ({params : {meetupId : meetup._id.toString()}}))
    }
}

export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://dbUser:W7szCpR6QTu4FztB@cluster0.yvtemfj.mongodb.net/?retryWrites=true&w=majority');
    const meetupCollection = client.db().collection('meetups');
    const meetup = await meetupCollection.findOne({_id : ObjectId(meetupId)});
    client.close();
    return {
        props : {
            meetup :{
                title : meetup.title,
                image : meetup.image,
                address : meetup.address,
                description : meetup.description,
                id : meetup._id.toString()
            }
        }
    }
    
}

export default MeetupDetailsPage;