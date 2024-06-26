import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  faqs: createDefaultState(),
};

function createDefaultState() {
  return {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null,
  };
}

const fetchFaqData = async (url, thunkAPI) => {
  try {
    const response = await axios.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return thunkAPI.rejectWithValue("Failed to fetch FAQs.");
  }
};

export const fetchFaq = createAsyncThunk(
  "FaqSlice/fetchFaq",
  async (_, thunkAPI) => {
    const url = "https://faq-accordion-backenddddd.onrender.com/api/faqs";
    return await fetchFaqData(url, thunkAPI);
  }
);

export const FaqSlice = createSlice({
  name: "FaqSlice",
  initialState,
  reducers: {
    reset_data: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaq.pending, (state) => {
        state.faqs.isLoading = true;
      })
      .addCase(fetchFaq.fulfilled, (state, action) => {
        state.faqs.isLoading = false;
        state.faqs.isSuccess = true;
        state.faqs.isError = false;
        state.faqs.message = null;
        state.faqs.data = action.payload;
      })
      .addCase(fetchFaq.rejected, (state, action) => {
        state.faqs.isLoading = false;
        state.faqs.isError = true;
        state.faqs.isSuccess = false;
        state.faqs.message = action.error.message;
        state.faqs.data = null;
      });
  },
});

export const { reset_data } = FaqSlice.actions;

export default FaqSlice.reducer;