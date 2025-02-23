import React, { useEffect, useState } from 'react'
import sendRequest from '../../utils/SendRequest';

export default function Links() {
    const [allLinks, setAllLinks] = useState([]);

    const getAllLinksAPI = async () => {
        try {
            const response = await sendRequest("/links", {}, "GET", {})
            setAllLinks(response.data.links)
        } catch (error) {
            console.log("getAllLinksAPI error: ", error);
        }
    }

    const deleteLinkAPI = async (link_id) => {
        console.log("Inside deleteLinkAPI");
        try {
            const response = await sendRequest(`/links/${link_id}`, {}, "DELETE", {})
            console.log("deleteLinkAPI response: ", response);

            getAllLinksAPI();
        } catch (error) {
            console.log("deleteLinkAPI error: ", error);
        }
    }

    useEffect(() => {
        getAllLinksAPI();
    }, [])

    return (
        <>
            <div>Links</div>
            <ul>
                {
                    allLinks.length > 0 ?
                        allLinks.map((link) => {
                            return <li key={link.link_id}>
                                <a href={link.link} target='_blank'>{link.link}</a>
                                <br />
                                <button onClick={() => deleteLinkAPI(link.link_id)}>del</button>
                            </li>
                        }) :
                        <>
                            <p>NO LINKS</p>
                        </>
                }
            </ul>
        </>
    )
}