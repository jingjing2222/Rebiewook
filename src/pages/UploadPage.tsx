import UploadBasedForm from "@/pages/UploadForm/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

export interface DBBook {
  author: string;
  cover_image: string;
  description: string;
  detailed_review: string;
  published_date: string;
  title: string;
}

export const UploadPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { status, mutate: insertBookMutation } = useMutation({
    mutationKey: ["insertBook"],
    mutationFn: (book: DBBook) => insertBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchReviews"] });
      navigate("/reviewlistpage");
    },
  });

  async function insertBook(book: DBBook) {
    const { data, error } = await supabase.from("book").insert(book).select();
    if (error) {
      console.error(error);
    }
    return data;
  }

  const sendMessage = () => {
    window.ReactNativeWebView.postMessage("photo");
  };

  return (
    <>
      <button className="w-[300px] h-[200px]" onClick={sendMessage}>
        이 버튼은 웹입니다.
      </button>
      <UploadBasedForm
        onClick={insertBookMutation}
        content="Upload"
        status={status}
      />
    </>
  );
};
