const { gql, request } = require("graphql-request");

const MASTER_URL = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_MASTER_URL_KEY}/master`;

const getCategory = async () => {
  const query = gql`
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
  `;
  return await request(MASTER_URL, query);
};

const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists(first: 20) {
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
  `;
  return await request(MASTER_URL, query);
};

const getBusinessByCategory = async (category) => {
  const query = gql`
    query BusinessByCategory {
      businessLists(where: { category: { name: "${category}" } }) {
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
  `;
  return await request(MASTER_URL, query);
};

const getBussinesById = async (id) => {
  const query = gql`
    query GetBusinessById {
      businessList(where: { id: "${id}" }) {
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
  `;
  return await request(MASTER_URL, query);
};



const getBussinesByEmail = async (email) => {
  const query = gql`
    query GetBusinessById {
      businessList(where: {email: "${email}"}) {
    email
    about
    address
    bookings {
      date
      id
      time
      userEmail
      userName
    }
    category {
      name
    }
    contactPerson
    id
    name
    images {
      url
    }
  }
    }
  `;
  return await request(MASTER_URL, query);
};



const createNewBooking = async (businessId, date, time, userEmail, userName) => {
  const mutationQuery = gql`
    mutation MyMutation {
      createBooking(
        data: {
          bookingStatus: booked,
          businessList: { connect: { id: "${businessId}" } },
          date: "${date}",
          time: "${time}",
          userEmail: "${userEmail}",
          userName: "${userName}"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery);
};

const BusinessBookedSlot = async (businessId, date) => {
  const query = gql`
    query BuisnessBookedSlot {
      bookings(where: { businessList: { id: "${businessId}" }, date: "${date}" }) {
        date
        time
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const GetUserBookingHistory = async (userEmail) => {
  const query = gql`
    query GetUserBookingHistory {
      bookings(
        where: { userEmail: "${userEmail}" }
        orderBy: date_ASC
        first: 30
      ) {
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
        id
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const GetSliders = async () => {
  const query = gql`
    query MyQuery {
      sliders {
        image {
          url
        }
      }
    }
  `;
  return await request(MASTER_URL, query);
};


const createOrUpdateProfile = async (email, name, phoneNumber, address, pincode) => {
  if (!email || !name || !phoneNumber || !address || !pincode) {
    throw new Error("All fields are required.");
  }

  const phoneNumberValid = Number(phoneNumber);
  const pincodeValid = Number(pincode);

  if (isNaN(phoneNumberValid) || isNaN(pincodeValid)) {
    throw new Error("Phone number and Pincode must be valid numbers.");
  }

  const mutationQuery = gql`
    mutation CreateOrUpdateProfile(
      $email: String!
      $name: String!
      $phoneNumber: Int!
      $address: String!
      $pincode: Int!
    ) {
      upsertProfile(
        where: {email: $email}
        upsert: {
          create: {
            email: $email
            name: $name
            phoneNumber: $phoneNumber
            address: $address
            pincode: $pincode
          }
          update: {
            name: $name
            phoneNumber: $phoneNumber
            address: $address
            pincode: $pincode
          }
        }
      ) {
        id
      }
      publishManyProfiles(to: PUBLISHED) {
        count
      }
    }
  `;

  const variables = {
    email,
    name,
    phoneNumber: phoneNumberValid,
    address,
    pincode: pincodeValid,
  };

  return await request(MASTER_URL, mutationQuery, variables);
};



const getProfile = async (email) => {
  const query = gql`
    query MyQuery {
  profile(where: {email: "`+ email + `"}) {
    name
    phoneNumber
    pincode
    email
    address
  }
}
  `;
  return await request(MASTER_URL, query);
};


const createReview = async (rating, reviewText, userEmail, userName, businessId, date) => {
  const mutationQuery = gql`
    mutation CreateReview {
      createReview(
        data: {
          rating: ${rating},
          reviewText: "${reviewText}",
          userEmail: "${userEmail}",
          userName: "${userName}",
          date: "${date}",
          businessList: { connect: { id: "${businessId}" } }
        }
      ) {
        id
        rating
        reviewText
        userEmail
        userName
        date
        businessList {
          id
        }
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery);
};



const getReviewsByBusiness = async (businessId) => {
  const query = gql`
    query {
      reviews(where: { businessList: { id: "${businessId}" } }, orderBy: createdAt_DESC) {
        id
        rating
        reviewText
        userEmail
        userName
        date
      }
    }
  `;
  return await request(MASTER_URL, query);
};

// GET ALL REVIEWS
const getReviews = async (businessId) => {
  const query = gql`
    query {
      reviews(where: { businessList: { id: "${businessId}" } }, orderBy: createdAt_DESC) {
        id
        rating
        reviewText
        userEmail
        userName
        date
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const createOrUpdateCategory = async (id, name, iconUrl, bgColor) => {
  if (!name || !iconUrl || !bgColor) {
    throw new Error('Name, icon URL, and background color are required.')
  }

  // Sanitize inputs (optional here, GraphQL variables help prevent injection)
  const mutationQuery = gql`
    mutation CreateOrUpdateCategory(
      $id: ID
      $name: String!
      $iconUrl: String!
      $bgColor: Hex!
    ) {
      ${
        id
          ? `
      updateCategory(
        where: { id: $id }
        data: {
          name: $name
          icon: { update: { url: $iconUrl } }
          bgcolor: { hex: $bgColor }
        }
      ) {
        id
      }
      `
          : `
      createCategory(
        data: {
          name: $name
          icon: { create: { url: $iconUrl } }
          bgcolor: { hex: $bgColor }
        }
      ) {
        id
      }
      `
      }
      publishManyCategories(to: PUBLISHED) {
        count
      }
    }
  `

  const variables = {
    id,
    name,
    iconUrl,
    bgColor,
  }

  return await request(MASTER_URL, mutationQuery, variables)
}



const deleteCategory = async (id) => {
  const mutationQuery = gql`
    mutation DeleteCategory {
      deleteCategory(where: { id: "${id}" }) {
        id
      }
      publishManyCategories(to: PUBLISHED) {
        count
      }
    }
  `;
  return await request(MASTER_URL, mutationQuery);
};

const getBusinessById = (businessId) => {
  const query = gql`
    query GetBusinessById($id: ID!) {
      businessList(where: { id: $id }) {
        id
        email
        bookings {
          id
          bookingDate
        }
      }
    }
  `;
  return request(MASTER_URL, query, { id: businessId });
};

const getBusinessByEmail = (email) => {
  const query = gql`
    query GetBusinessByEmail($email: String!) {
      businessLists(where: { email: $email }) {
        id
        name
        email
        bookings {
          id
          bookingDate
        }
      }
    }
  `;
  return request(MASTER_URL, query, { email });
};



export const getAllBusinessWithBookingCount = async () => {
  const query = gql`
    query GetAllBusinessBookingCounts {
      businessLists {
        id
        name
        category {
          name
        }
        bookings {
          id
        }
      }
    }
  `;
  return await request(MASTER_URL, query);
};

export const getAllBookings = async () => {
  const query = gql`
    query GetAllBookings {
      bookings(first: 1000) {
        id
        date
        time
        businessList {
          id
          name
          category {
            name
          }
        }
      }
    }
  `;
  return await request(MASTER_URL, query);
};


const getAllBookingsGroupedByCategory = async () => {
  const query = gql`
    query {
      businessLists {
        id
        name
        category {
          name
        }
        bookings {
          id
        }
      }
    }
  `;
  return await request(MASTER_URL, query);
};

const getAllReviewsWithBusiness = async () => {
  const query = gql`
    query {
      reviews(orderBy: createdAt_DESC, first: 1000) {
        id
        rating
        reviewText
        date
        businessList {
          id
          name
          category {
            name
          }
        }
      }
    }
  `;
  const data = await request(MASTER_URL, query);
  return data;
};



export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBussinesById,
  createNewBooking,
  BusinessBookedSlot,
  GetUserBookingHistory,
  GetSliders,
  createOrUpdateProfile,
  getProfile,
  getBussinesByEmail,
  createReview,
  getReviewsByBusiness,
  getReviews,
  createOrUpdateCategory,
  deleteCategory,
  getBusinessByCategory,
  getBusinessByEmail,
  getBusinessById,
  getAllBusinessWithBookingCount,
  getAllBookings,
  getAllBookingsGroupedByCategory,
  getAllReviewsWithBusiness

};
