import {
  Comment,
  CommentContext,
  findComment,
} from "@/context/CommentProvider";
import {
  PostContext,
  PostDispatchContext,
  POST_INIT,
} from "@/context/PostProvider";
import metapost from "@/database/metapost/posts.json";
import {
  format,
  getRandomItemInArray,
  slugToBlogTrailingSlash,
} from "@/util/tool";
import { Box, Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

function SearchBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { posts } = useContext(PostContext);
  const postDispatch = useContext(PostDispatchContext);
  const [searchList, setSearchList] = useState([]);
  const { comments } = useContext(CommentContext);

  useEffect(() => {
    postDispatch({
      type: POST_INIT.INIT,
      posts: metapost,
    });
    window.addEventListener("keyup", handleKeydownClose);
    window.addEventListener("click", handleClickClose);
    return () => {
      window.removeEventListener("keyup", handleKeydownClose);
      window.removeEventListener("click", handleClickClose);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setSearchList([]);
    }
  }, [open]);

  function handleKeydownClose(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      setSearchList([]);
    }
  }

  function handleClickClose(e: MouseEvent) {
    const target = e.target as HTMLDivElement;
    if (!(target.closest("#search-open") || target.closest("#search"))) {
      setOpen(false);
      setSearchList([]);
    }
  }

  function handleSearch() {
    if (inputRef.current) {
      const value = inputRef.current.value;
      const searchedList = posts.filter(
        (post: any) =>
          value &&
          (post.frontmatter.slug?.match(value) ||
            post.frontmatter.title?.match(value) ||
            post.frontmatter.description?.match(value) ||
            post.frontmatter.category?.match(value) ||
            post.frontmatter.tag?.match(value))
      );
      setSearchList(searchedList);
    }
  }

  const findCommentOrDefault = useCallback(
    (commentList: Comment[], item: any) => {
      const comment = findComment(commentList, item.frontmatter.slug);
      return comment
        ? { title: comment.title, comments: comment.comments }
        : {
            title: item.frontmatter.slug,
            comments: 0,
          };
    },
    [inputRef.current?.value]
  );

  return open ? (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        right: 0,
        bototm: 0,
        backgroundColor: "#000000a6",
      }}>
      <Paper
        id='search'
        elevation={5}
        sx={{
          position: "fixed",
          top: "50vh",
          left: "50vw",
          transform: "translate(-50%, -50%)",
          p: 5,
          minWidth: {
            xs: "80vw",
            lg: "50vw",
          },
          zIndex: 1000,
        }}>
        <Typography gutterBottom>✨ Search</Typography>
        <TextField
          fullWidth
          size='small'
          placeholder={
            "예시) " +
            getRandomItemInArray(getRandomItemInArray(posts).frontmatter.tags)
          }
          inputRef={inputRef}
          // disabled
          onKeyUp={handleSearch}
          autoFocus
        />
        {searchList.length > 0 && (
          <Stack
            gap={1}
            sx={{
              maxHeight: "50vh",
              overflow: "auto",
            }}>
            {inputRef?.current?.value && (
              <>
                {/* <Toolbar /> */}
                <Typography
                  fontSize={(theme) => theme.typography.pxToRem(20)}
                  fontWeight={700}
                  sx={{
                    mt: 3,
                  }}>
                  검색 결과: {searchList.length}개
                </Typography>
              </>
            )}
            {searchList.map((item: any, i) => (
              <Stack
                component={Link}
                onClick={() => {
                  setSearchList([]);
                  setOpen(false);
                }}
                href={slugToBlogTrailingSlash(item.frontmatter.slug)}
                key={i}
                sx={{
                  p: 1,
                  transition: "150ms ease-in-out",
                  "&:hover": {
                    backgroundColor: "#56565613",
                    cursor: "pointer",
                  },
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <Stack direction='row' gap={2}>
                  <Typography fontSize={16} fontWeight={700}>
                    {item.frontmatter.title}
                  </Typography>
                  <Chip label={item.frontmatter.author} size='small' />
                </Stack>
                <Typography fontSize={14} fontWeight={200}>
                  💬 Comments ({findCommentOrDefault(comments, item).comments})
                </Typography>
                <Typography fontSize={14} fontWeight={200}>
                  {item.readingTime}
                </Typography>
                <Typography fontSize={14} fontWeight={200}>
                  {format(
                    new Date(item.frontmatter.date.slice(0, -6)),
                    "YYYY-MM-dd HH:mm"
                  )}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  ) : (
    <Box></Box>
  );
}

export default SearchBar;
