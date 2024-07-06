import Link from "next/link";

async function getUsers(){
  const response = await fetch('http://localhost:3000/api/users');
  const data = await response.json();
  return data.response
}

const page = async() => {
  const userDetails = await getUsers();
 
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl ">Users</h1>
      <div className="border-2 rounded-sm p-2.5 grid grid-cols-2 gap-2.5">
        {userDetails.map((item,index) => <div key={item.id} className="border p-2.5 rounded my-2.5 border-black">
          <h1>UserName: {item.username}</h1>
          <h1>Email Address: {item.email}</h1>
          <h1>Phone Number: {item.phone}</h1>
          <h1>Address: {item.address}</h1>
        </div>)}
      </div>
      <Link href="/signup" className="mt-2.5 underline text-2xl text-blue-400">Add Users</Link>
    </div>
  )
}

export default page 