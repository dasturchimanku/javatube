import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ApiService } from "../../service/api.service";
import { Box, Typography, Chip, Avatar, Stack } from "@mui/material";
import ReactPlayer from "react-player";
import { Loader, Videos } from "../";

const VideoDetail = () => {
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    const [reletedVideo, setReletedVideo] = useState([]);
    const [channelDetail, setChannelDetail] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                // 🔹 Video haqida ma’lumot
                const data = await ApiService.fetching(
                    `videos?part=snippet,statistics&id=${id}`
                );
                setVideoDetail(data.items[0]);

                // 🔹 Suggested videos
                const relatedData = await ApiService.fetching(
                    `search?part=snippet&relatedToVideoId=${id}&type=video`
                );
                setReletedVideo(relatedData.items);

                // 🔹 Kanal haqida ma’lumot (avatar uchun)
                const channelData = await ApiService.fetching(
                    `channels?part=snippet&id=${data.items[0]?.snippet?.channelId}`
                );
                setChannelDetail(channelData.items[0]);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [id]);

    if (!videoDetail?.snippet) return <Loader />;

    const {
        snippet: {
            title,
            channelId,
            channelTitle,
            description,
            tags,
            publishedAt,
        },
        statistics: { viewCount, likeCount, commentCount },
    } = videoDetail;

    return (
        <Box minHeight={"90vh"} mb={10}>
            <Box
                display={"flex"}
                sx={{ flexDirection: { xs: "column", md: "row" }, m: "10px" }}
            >
                {/* Video Player */}
                <Box width={{ xs: "100%", md: "75%" }}>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${id}`}
                        className="react-player"
                        controls
                        width="100%"
                        height="480px"
                    />

                    {/* Title */}
                    <Typography variant="h5" fontWeight="bold" mt={2}>
                        {title}
                    </Typography>

                    {/* Channel info with Avatar */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        mt={2}
                    >
                        <Avatar
                            src={
                                channelDetail?.snippet?.thumbnails?.default?.url
                            }
                            alt={channelTitle}
                            sx={{ width: 48, height: 48 }}
                        />
                        <Link to={`/channel/${channelId}`}>
                            <Typography color="primary" fontWeight="bold">
                                {channelTitle}
                            </Typography>
                        </Link>
                    </Stack>

                    {/* Stats */}
                    <Typography variant="body2" color="text.secondary" mt={1}>
                        {parseInt(viewCount).toLocaleString()} views •{" "}
                        {parseInt(likeCount).toLocaleString()} likes •{" "}
                        {parseInt(commentCount).toLocaleString()} comments
                    </Typography>

                    {/* Published Date */}
                    <Typography variant="body2" color="text.secondary">
                        Published on{" "}
                        {new Date(publishedAt).toLocaleDateString()}
                    </Typography>

                    {/* Tags */}
                    <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                        {tags?.map((tag, index) => (
                            <Chip
                                key={index}
                                label={`#${tag}`}
                                variant="outlined"
                                size="small"
                            />
                        ))}
                    </Box>

                    {/* Description */}
                    <Typography mt={2} variant="body1">
                        {description}
                    </Typography>
                </Box>

                {/* Suggested Videos */}
                <Box
                    width={{ xs: "100%", md: "25%" }}
                    px={2}
                    py={{ md: 1, xs: 5 }}
                    overflow="auto"
                    maxHeight="1000vh"
                >
                    <Typography variant="h6" mb={2}>
                        Suggested videos
                    </Typography>
                    <Videos videos={reletedVideo} />
                </Box>
            </Box>
        </Box>
    );
};

export default VideoDetail;
