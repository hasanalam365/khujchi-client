import React, { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddInfo = () => {
    const [imgPrev, setImgPrev] = useState('')
const axiosPublic=useAxiosPublic()
const [selectedOption,setSelectedOption]=useState('')


    const handleAddress = async (e) => {

        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.files[0];
        const address = form.address.value;
        const age = form.age.value;
        const extraInformation = form.extraInformation.value;


        //help man
        const phone = form.phone.value;
        const email = form.email.value;
        const division = form.division.value;
        const district = form.district.value;
        const thana = form.thana.value;
        const helpName = form.helpName.value;
        const helpAddress = form.helpAddress.value;
        const helpExtraInformation = form.helpExtraInformation.value;

        try {
         
                //image upload 
                const formData = new FormData();
                formData.append('image', photo);
                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const photoURL = res.data.data.display_url;

                const allInfo = { name,age, phone, email, division, district, thana, address, photoURL,extraInformation,helpName,helpAddress,selectedOption ,helpExtraInformation}

                const resPost = await axiosPublic.post(`/add-post`, allInfo)

                if (resPost.data.insertedId) {
                    toast('আপনার তথ্যটি সংযুক্ত করা হয়েছে')

                  
                }
            
        } catch (error) {
            console.log(error.message)
        }


    }

    const handleImg = (e) => {

        const photo = e.target.files[0];
        setImgPrev(photo.name)

    }
    
    return (
        <div>
        <section className="dark:text-gray-900 w-[95%] md:mt-5 lg:mt-0 mx-auto bg-gray-200">
                <form onSubmit={handleAddress} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="p-6 rounded-md shadow-sm dark:bg-gray-50">
                    <div className="text-center bg-slate-400 text-white p-1">
                               <h3>নিখোঁজ ব্যক্তির তথ্য</h3>
                     </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 mt-5">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">নাম</label>
                                <input
                                    id="fullName"
                                    name="name"
                                    type="text"
                                    placeholder="নাম লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Age" className="font-medium"> আনুমানিক বয়স</label>
                                <input
                                    id="age"
                                    type="text"
                                    name="age"
                                    placeholder="বয়স লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full ">
                                <label htmlFor="address" className="font-medium"> ঠিকানা <span className='text-sm'>(যদি বলতে পারে)</span></label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    placeholder="বিস্তারিত ঠিকানা লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                          
                            
                            <div className="col-span-full sm:col-span-3 text-center">
                                <label>
                                    <input
                                        onChange={handleImg}
                                        className="text-sm cursor-pointer w-36 hidden"
                                        type="file"
                                        name="photo"
                                        id="image"
                                        accept="image/*"
                                        required
                                    />
                                    <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-600">
                                        ছবি আপলোড
                                    </div>
                                </label>
                            </div>
                            {imgPrev ? (
                                <div className="col-span-full sm:col-span-3 flex items-center">
                                    {imgPrev}
                                </div>
                            ) : (
                                <div className="col-span-full sm:col-span-3 flex items-center text-red-600">
                                    কোনো ছবি পাওয়া যায়নি
                                </div>
                            )}
                           
                            <div className="col-span-full">
                                <label htmlFor="Extra Information" className="font-medium">অন্যান্য তথ্য</label>
                                <textarea
                                    id="extra-information"
                                    type="text"
                                    name="extraInformation"
                                    placeholder="এখানে লিখুন....."
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                        </div>

                        <div className="text-center bg-slate-400 text-white p-1 mt-5">
                               <h3>পোস্ট দাতার তথ্য</h3>
                     </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 mt-5 ">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">আপনার নাম</label>
                                <input
                                    id="fullName"
                                    name="helpName"
                                    type="text"
                                    placeholder="আপনার নাম লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="email" className="font-medium">ইমেইল <span className='text-sm'>(যদি থাকে)</span></label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                    placeholder='ই-মেইল লিখুন'
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="phone" className="font-medium">ফোন</label>
                                <input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    placeholder="ফোন নাম্বার লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="division" className="font-medium">বিভাগ</label>
                                <input
                                    id="division"
                                    type="text"
                                    name="division"
                                    placeholder="বিভাগ লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="district" className="font-medium">জেলা</label>
                                <input
                                    id="district"
                                    type="text"
                                    name="district"
                                    placeholder="জেলা লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="thana" className="font-medium">থানা/উপজেলা</label>
                                <input
                                    id="thana"
                                    type="text"
                                    name="thana"
                                    placeholder="থানা/উপজেলা লিখুন"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="helpAddress" className="font-medium">বিস্তারিত ঠিকানা</label>
                                <input
                                    id="helpAddress"
                                    type="text"
                                    name="helpAddress"
                                    placeholder="বাসা/হোল্ডিং/গ্রাম/রাস্তা"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3 w-full mt-2  md:mt-5 lg:mt-5">
                          
                            <select value={selectedOption}
                            onChange={(e)=>setSelectedOption(e.target.value)}
                            className="select select-bordered w-full " required>
                                
  <option disabled  value="">পোস্ট কেন করছেন?</option>
  <option value="আমরা খুঁজছি">আমরা খুঁজছি</option>
  <option value="আমরা পেয়েছি">আমরা পেয়েছি</option>
</select>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="help man Extra Information" className="font-medium">অন্যান্য তথ্য</label>
                                <textarea
                                    id="helpExtraInformation"
                                    type="text"
                                    name="helpExtraInformation"
                                    placeholder="এখানে লিখুন....."
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2"
                                    
                                />
                            </div>
                    </div>
                            

                        <div className="mt-2">
                            <button type="submit" className="btn btn-secondary w-full">
                                পোস্ট করুন
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default AddInfo;