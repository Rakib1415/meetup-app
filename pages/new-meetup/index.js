import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
    const router = useRouter();
    const onAddMeetup = async (meetupData) => {
        // fecth api
        const response = await fetch('api/new-meetup', {
            method : 'POST',
            body : JSON.stringify(meetupData),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    }
    return (
        <Fragment>
            <Head>
                <title>Add New Meetup</title>
                <meta name="description" content='Add a new meetup'/>
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetup}/>
        </Fragment>
    )
};

export default NewMeetupPage;