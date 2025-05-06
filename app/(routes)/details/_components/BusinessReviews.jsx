'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import GlobalApi from '@/app/_services/GlobalApi';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const BusinessReviews = ({ businessId }) => {
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await GlobalApi.getReviewsByBusiness(businessId);
      setReviews(res.reviews || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleSubmit = async () => {
    if (!userRating || !userReview) return alert('Please enter rating and review');
    if (!session?.user) return alert('You must be logged in to submit a review');

    setLoading(true);
    const { name, email } = session.user;

    // Format date as YYYY-MM-DD
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    try {
      await GlobalApi.createReview(userRating, userReview, email, name, businessId, formattedDate);
      setUserRating(0);
      setUserReview('');
      fetchReviews();
      window.location.reload();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit review');
    }

    setLoading(false);
  };

  const ratingsStats = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: reviews.filter((rev) => parseInt(rev.rating) === r).length,
  }));

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="mt-10 border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Submit Review Section */}
      <div className="mb-8 bg-[#e2eefc] p-4 rounded-md shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              onClick={() => setUserRating(i)}
              className={`cursor-pointer w-6 h-6 ${i <= userRating ? 'text-yellow-400' : 'text-gray-800'}`}
              fill={i <= userRating ? 'currentColor' : 'none'}
            />
          ))}
        </div>
        <Textarea
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
          placeholder="Write your review..."
          className="mb-3 bg-white border border-gray-300 p-3 rounded-md"
        />
        <Button className="text-white" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>

      {/* Review Summary */}
      {reviews.length > 0 ? (
        <>
          <div className='text-3xl font-semibold text-orange-500'>
            {(
              reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
            ).toFixed(1)}{' '}
            <span className='text-xl font-semibold text-black'>out of 5</span>
          </div>
          <span className="text-md text-gray-700 mb-2">based on {reviews.length} reviews</span>

          <div className="mt-4 space-y-1">
            {ratingsStats.map((stat) => (
              <div key={stat.rating} className="flex items-center gap-2 text-sm">
                <span className="w-16">{stat.rating} star</span>
                <div className="bg-gray-200 rounded-full h-2 w-full">
                  <div
                    className={`h-2 rounded-full ${stat.rating >= 4
                        ? "bg-green-500"
                        : stat.rating === 3
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    style={{
                      width: `${(stat.count / reviews.length) * 100 || 0}%`,
                    }}
                  ></div>
                </div>
                <span className="w-6 text-right">{stat.count}</span>
              </div>
            ))}
          </div>

          {/* Reviews List */}
          {displayedReviews.map((rev, index) => (
            <div key={index} className="mt-4 border rounded-lg p-4 mb-4 shadow-sm bg-white">
              <p className="font-semibold text-sm mb-1">{rev.userName}</p>
              <div className="flex items-center mb-1">
                {[...Array(Math.round(rev.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Reviewed on {new Date(rev.date).toLocaleDateString('en-GB')}
              </p>

              <p className="text-gray-700 mt-2 text-sm">{rev.reviewText}</p>
            </div>
          ))}

          {/* Show More / Hide Reviews Button */}
          {reviews.length > 2 && (
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Hide Reviews' : 'Show More Reviews'}
            </Button>
          )}
        </>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default BusinessReviews;
