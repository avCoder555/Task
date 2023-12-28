import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from '../services/user.services';

function Home() {
    let [userName, setUserName] = useState([]);
    let [posts, setPosts] = useState([]);
    let [userPost, setUserPost] = useState([]);

    const getAllUser = () => {
        const result = userServices.getUser()
            .then((res) => {
                if (res.status === 200) {
                    setUserName(res.data);
                    // console.log('User', res.data);    
                }
            }).catch((error) => {
                console.log('Get User Error', error);
            })
    }

    const getAllPost = () => {
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
        getAllPost();
    }, []);

    const postCounts = [];
    posts.forEach(element => {
        postCounts[element.userId] = (postCounts[element.userId] || 0) + 1;
    });

    useEffect(() => {
        let userPostArr = [];
        if (userName.length > 0 && postCounts.length > 0) {
            userName.map((item, index) => {
                let obj = {}
                postCounts.map((up) => {
                    obj['id'] = item.id
                    obj['user_name'] = item.name;                   
                    obj['post_count'] = up;
                })
                userPostArr.push(obj)
                setUserPost(userPostArr);
            })
        }

    }, [posts, userName]);
       
    return (
        <div className='page-width'>
            {
                userPost.map((item, index) =>
                    <div className='card' key={index}>
                        <Link to={`user/${item.id}`}>
                            <div className='card-left'>
                                <p>Name: {item.user_name}</p>
                            </div>
                            <div className='card-right'>
                                <p>Posts: {item.post_count}</p>
                            </div>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default Home;