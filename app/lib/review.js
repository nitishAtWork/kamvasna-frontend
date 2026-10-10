import { apiRequest } from "./api";

export const reviewApi = {
  /*
   * Get reviews for a product
   *
   * params:
   * {
   *   page: 1,
   *   limit: 10
   * }
   */
  getReviews(productId, params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          searchParams.append(key, value);
        }
      }
    );

    const query =
      searchParams.toString();

    return apiRequest(
      `/products/${productId}/reviews${query ? `?${query}` : ""
      }`
    );
  },

  /*
   * Create review
   *
   * data:
   * {
   *   rating,
   *   title,
   *   comment,
   *   images: File[]
   * }
   */
  create(productId, data) {
    const formData = new FormData();

    formData.append(
      "rating",
      String(data.rating)
    );

    formData.append(
      "title",
      data.title || ""
    );

    formData.append(
      "comment",
      data.comment || ""
    );

    if (
      Array.isArray(data.images)
    ) {
      data.images.forEach((image) => {
        formData.append(
          "images",
          image
        );
      });
    }

    return apiRequest(
      `/products/${productId}/reviews`,
      {
        method: "POST",
        body: formData,
      }
    );
  },

  /*
   * Update review
   *
   * Currently updates:
   * - rating
   * - title
   * - comment
   */
  update(reviewId, data) {
    return apiRequest(
      `/reviews/${reviewId}`,
      {
        method: "PATCH",
        body: data,
      }
    );
  },

  /*
   * Delete review
   */
  remove(reviewId) {
    return apiRequest(
      `/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );
  },

  //   get all approved
  getAllApproved() {
    return apiRequest(
      `/reviews/approved`,
      {
        method: "GET",
      }
    );
  },

  getMyReviews(params = {}) {
    const searchParams =
      new URLSearchParams();

    Object.entries(params).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          searchParams.append(
            key,
            value
          );
        }
      }
    );

    const query =
      searchParams.toString();

    return apiRequest(
      `/reviews/my${query
        ? `?${query}`
        : ""
      }`,
      {
        method: "GET",
      }
    );
  },

};