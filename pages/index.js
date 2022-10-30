import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
const HomePage = (props) => {
    return (
        <MeetupList meetups={props.meetups}/>
    )
};

export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://dbUser:W7szCpR6QTu4FztB@cluster0.yvtemfj.mongodb.net/?retryWrites=true&w=majority');
    const meetupCollection = client.db().collection('meetups');
    const meetupData = await meetupCollection.find().toArray();
    return {
        props : {
            meetups : meetupData.map(meetup => (
                {
                    title : meetup.title,
                    image : meetup.image,
                    address : meetup.address,
                    description : meetup.description,
                    id : meetup._id.toString() 
                }
            ))
        },
        revalidate : 1
    }

}

export default HomePage;