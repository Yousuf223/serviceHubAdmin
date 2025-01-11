'use client'
import { useEffect, useState } from "react";
import PostComponent from '@/components/PostComponent/PostComponent'
import { Loader } from "@/components/custom/Loader";
import { API } from "@/api";


export default function Page({ params: { id } }) {
    const [post, setPost] = useState([])
    const [loader, setLoader] = useState(false);
    const getUser = async () => {
        try {
            setLoader(true);
            const res = await API.getPostById(id);
            console.log('-----res-----', res)
            setPost(res?.data?.data);
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getUser()
    }, []);
    return (
        <div>
            <h2 className="text-4xl text-start text-primary font-bold mb-12">
                Posts
            </h2>
            {post?.length > 0 ? null :  <h4 className="text-black" >Posts Not Found</h4>}
            {/* <h4 className="text-black" >Posts Not Found</h4> */}
            <div className="grid grid-cols-4 gap-4">
                {post?.map((item, index) => {
                    console.log('-----itemitem-----',item?.images[0])
                    return (
                        <div  key={index}>
                            <PostComponent 
                            image={item?.images[0]} userImg={item?.createdBy?.userImage}
                            title={item?.title} name={item?.createdBy?.userName} dcription={item?.description} />
                        </div>
                    )
                })}
            </div>
        </div>

    )
}
