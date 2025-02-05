import { checkToken } from '../../utilities/users-services'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as participantsAPI from '../../utilities/participants-api'
import './EventPage.css'
import logo from './assets/fried-clay.png'

export default function EventPage() {
    const [participants, setParticipants] = useState([])
    let participantList;
    const navigate = useNavigate()

    async function handleCheckToken() {
        checkToken()
        navigate('/manage')
    }

    useEffect(function () {
        async function getAllParticipants() {
            const participants = await participantsAPI.showParticipants()
            setParticipants(participants)
        }
        getAllParticipants()
    }, [])

    if (participants.length !== 0) {
        participantList = participants.participants.map((participant) => (
            <div className='list-of-attendees' key={participant._id}>
                <div>{participant.name}</div>
                <div>{participant.location}</div>
            </div>
        ))
    }



    return (


        <div className='event-page'>
            <h2>Event Page</h2>
            <div className='event-page-container-top'>
                <div className='logo'>
                    <img className='logo-img' src={logo}></img>
                </div>
                <button onClick={handleCheckToken}>Manage Registration</button>
            </div>
            <div className='event-page-container-bottom'>
                <div className='event-desc-container'>
                    <div className='event-desc-header'>Event  Description</div>
                    <div className='event-desc-body'>This is the fourth edition of the Fried Clay 200k. A self-supported endurance gravel event that takes you through 130ish miles of the Chattahoochee-Oconee National Forest. Expect a grueling trip down some of the best gravel roads middle Georgia has to offer. The route combines the popular Red Clay Ramble and Fried Green Tomatoes routes plus a lot of weird junk I added to make it even harder! You will need a GPS or a smart phone to navigate as there will be no markings on the route at all! Expect long stretches of gravel, mild singletrack, water crossings, horse trails, and mud. If you've been thinking about giving this whole endurance gravel/bikepacking thing a shot, this is the perfect event. Some riders will choose to race, while others will party pace it. This event can be the perfect opportunity to try a longer gravel race, or a tough overnighter if you want to bikepack it. If you chose to camp on the route, there will be marked primitive campsites on the route guide you will receive via e-mail before the event. Your registration gets you the GPX route, an in-depth route guide, and a dope patch. We will have a camp setup the night before if you choose to come down early! You will receive more details via email once registered. This event will take place rain or shine! There are no refunds on registration, but you can transfer your registration. If you have any questions, feel free to reach out.</div>
                </div>
                <div className='attendees-container'>
                    <div className='attendees-header'>List of Attendees</div>
                    {participantList}
                </div>
            </div>
        </div>
    )
}
