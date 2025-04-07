const { gql, default: request } = require("graphql-request");

const MASTER_URL = 'https://ap-south-1.cdn.hygraph.com/content/'+process.env.NEXT_PUBLIC_MASTER_URL_KEY+'/master';

const getCategory = async() =>{
    const query=gql`
    query Category {
  categories {
    bgcolor {
      hex
    }
    id
    name
    icon {
      url
    }
  }
}
`
const result = await request(MASTER_URL,query)
return result
}

const getAllBusinessList = async() =>{
  const query = gql`
  query BusinessList {
  businessLists(first:20) {
    about
    address
    category {
      name
    }
    contactPerson
    email
    id
    images {
      url
    }
    name
  }
}
  `
  const result = await request(MASTER_URL,query)
  return result

}

const getBusinessByCategory = async(category) =>{
  const query =gql`
  query BusinessByCategory {
  businessLists(where: {category: {name: "`+category+`"}}) {
    about
    address
    category {
      name
    }
    contactPerson
    email
    id
    name
    images {
      url
    }
  }
}
  `

  const result = await request(MASTER_URL,query)
  return result
}

const getBussinesById =async(id)=>{
  const query=gql`
  query GetBusinessById {
  businessList(where: {id: "`+id+`"}) {
    about
    address
    category {
      name
    }
    contactPerson
    email
    id
    images {
      url
    }
    name
  }
}
  `
  const result = await request(MASTER_URL,query)
  return result
}

const createNewBooking =async (businessId,date,time,userEmail,userName)=>{
  const mutationQuery =gql`
  mutation MyMutation {
  createBooking(
    data: {bookingStatus: booked, 
    businessList: {connect: {id: "`+businessId+`"}}, 
    date: "`+date+`", 
    time: "`+time+`", 
    userEmail: "`+userEmail+`", 
    userName: "`+userName+`"}
  ) {
    id
  }
    publishManyBookings(to: PUBLISHED) {
    count
  }
}
  `
  const result = await request(MASTER_URL,mutationQuery)
  return result
}

const BusinessBookedSlot = async(businessId,date)=>{
  const query=gql`
  query BuisnessBookedSlot {
  bookings(where: {businessList: {id: "`+businessId+`"}, date: "`+date+`"}) {
    date
    time
  }
}
  `
  const result = await request(MASTER_URL,query)
  return result
}

const GetUserBookingHistory = async(userEmail)=>{
  const query = gql`
  query GetUserBookingHistory {
  bookings(where: {userEmail: "`+userEmail+`"}, orderBy: date_ASC) {
    businessList {
      name
      images {
        url
      }
      contactPerson
      address
    }
    date
    time
  }
}
  `

  const result = await request(MASTER_URL,query)
  return result
}

const GetSliders = async()=>{
  const query = gql`
  query MyQuery {
  sliders {
    image {
      url
    }
  }
}
  `
  const result = await request(MASTER_URL,query)
  return result

}

export default{
    getCategory,
    getAllBusinessList,
    getBusinessByCategory,
    getBussinesById,
    createNewBooking,
    BusinessBookedSlot,
    GetUserBookingHistory,
    GetSliders
}