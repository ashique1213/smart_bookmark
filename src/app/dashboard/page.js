"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // Protect route
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };

    checkUser();
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    if (user) fetchBookmarks();
  }, [user]);

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

const deleteBookmark = async (id) => {
  setBookmarks((prev) => prev.filter((b) => b.id !== id));
  await supabase.from("bookmarks").delete().eq("id", id);
};


  // Realtime
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 text-black">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Welcome {user.email}
          </h1>
          <button onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </div>

        <div className="flex gap-3">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <button onClick={addBookmark} className="bg-blue-600 text-white px-5 rounded-lg">
            Add
          </button>
        </div>

        <div className="space-y-3">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="flex justify-between border p-4 rounded-xl">
              <a href={bookmark.url} target="_blank" className="text-blue-600">
                {bookmark.title}
              </a>
              <button onClick={() => deleteBookmark(bookmark.id)} className="text-red-500">
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
