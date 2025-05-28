import UploadBasedForm from "@/pages/UploadForm/UploadBasedForm";
import { supabase } from "@/supabase/Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

export interface IselectedImage {
  base64: string;
  width: string;
  height: string;
  fileName: string;
  fileSize: string;
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

  const [selectedImage, setSelectedImage] = useState<IselectedImage | null>(
    null,
  );

  const handleMessage = async (event: MessageEvent) => {
    try {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "imageSelected") {
        const imageInfo = messageData.data;
        setSelectedImage(imageInfo);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  useEffect(() => {
    window.ReactNativeWebView.postMessage("photo");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
      <div>
        <button
          className="w-[100px] h-[100px] border-2 border-black"
          onClick={sendMessage}
        >
          이 버튼은 웹입니다.
        </button>
        {selectedImage && (
          <img
            src={selectedImage.base64}
            alt={selectedImage.fileName}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div>
      <UploadBasedForm
        onClick={insertBookMutation}
        content="Upload"
        status={status}
      />
    </>
  );
};
