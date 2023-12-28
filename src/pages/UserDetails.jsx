import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import userServices from '../services/user.services';
import { API, USER_URL } from '../services/config';
import Popup from '../components/Popup';
import UserHeader from '../components/UserHeader';


export default function UserDetails() {
  let { id } = useParams();
  let [posts, setPosts] = useState([]);
  let [userDetails, setUserDetails] = useState([]);

  const getAllUser = async () => {
    const result = await API.get(`${USER_URL}/users/${id}`)
    setUserDetails(result.data);
  }

  const getPosts = () => {
    const result = userServices.getPost()
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      }).catch((error) => {
        console.log('Get Post Error', error);
      })
  }

  useEffect(() => {
    getAllUser();
    getPosts();
  }, [])

  let address = userDetails?.address
  address = `${address?.street}, ${address?.suite}, ${address?.city}, ${address?.zipcode}`

  const [isOpen, setIsOpen] = useState(false);
  let [postTitle, setPostTitle] = useState();
  let [postBody, setPostBody] = useState();
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const postClick = (title, body) => {
    togglePopup();
    setPostTitle(title);
    setPostBody(body)
  }

  return (
    <div className='user-details page-width'>
      <UserHeader />
      <div className='user-details-body'>
        <h2>Profile Page</h2>
        <div className='profile-card'>
          <div className='profile-card-left'>
            <p><strong>Name:</strong> {userDetails?.name}</p>
            <p><strong>Username:</strong> {userDetails?.username} | <strong>Catch phrase:</strong> {userDetails?.company?.catchPhrase}</p>
          </div>
          <div className='profile-card-right'>
            <p><strong>Address:</strong> {address ? address : ''}</p>
            <p><strong>Email:</strong> {userDetails?.email?.toLowerCase()} | <strong>Phone:</strong> {userDetails?.phone?.split(' ')?.[0]}</p>
          </div>
        </div>
        <div className='posts-card'>
          {
            posts.filter((post) => post.userId == userDetails.id).map((item, index) =>
              <div className='post' key={index} onClick={() => postClick(item.title, item.body)}>
                <h4>{item?.title}</h4>
                <p>{`${item?.body?.substring(0, 100)}...`}</p>
              </div>
            )
          }
        </div>
      </div>

      
        {isOpen && <Popup 
          content={<> 
            <h3>{postTitle}</h3>
            <p>{postBody}</p>           
          </>}
          handleClose={togglePopup}
        />}
    </div>
  )
}
