import CommunityLabel from "../molecules/Div/CommunityLabel";
import CommunityRoomButton from "../molecules/Div/CommunityRoomButton";
import { useNavigate, useParams } from "react-router-dom";
import useGetChannelList from "@hooks/query/useGetChannelList";
import UserChannelOnBox from "@components/molecules/Div/UserChannelOnBox";
import { useUserStore } from "@store/useUserStore";
import UserFriendChannelOnBox from "@components/molecules/Div/UserFriendChannelOnBox";
import useGetFriendList from "@hooks/query/useGetFriendList";
import AddIcon from "@components/atoms/Icons/AddIcon";
import useModalStore from "@store/useModalStore";
import useGetCommunityList from "@hooks/query/useGetCommunityList";
import useGetCategoryList from "@hooks/query/useGetCategoryList";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface ChannelType {
  channel_id: number;
  channel_name: string;
}

interface RoomType {
  type: number;
  category_id: number;
  channel_id: number;
  channel_name: string;
}

const Tab2CommunityBody = () => {
  const navigate = useNavigate();
  const { communityId, channelId } = useParams();
  const channelList = useGetChannelList({
    communityId,
  });
  const categoryList = useGetCategoryList({
    communityId,
  });

  const [dndCategoryList, setDndCategoryList] =
    useState<ChannelType[]>(categoryList);
  const [dndChannelList, setDndChannelList] = useState<RoomType[]>(channelList);
  const { userInfo } = useUserStore();
  const { data: friendList } = useGetFriendList(userInfo.email);

  const { setModalType, setShowModal } = useModalStore();

  const showCreateCategoryModal = () => {
    setModalType("createCategory");
    setShowModal(true);
  };

  const showCreateChannelModal = () => {
    setModalType("createChannel");
    setShowModal(true);
  };

  const showPatchCategoryModal = () => {
    setModalType("patchCategory");
    setShowModal(true);
  };
  const showDeleteCategoryModal = () => {
    setModalType("deleteCategory");
    setShowModal(true);
  };

  console.log(categoryList);

  if (!communityId)
    return (
      <>
        <button onClick={showCreateChannelModal}>
          <AddIcon />
        </button>
        <button onClick={showCreateCategoryModal}>
          <AddIcon />
        </button>
      </>
    );

  // const List = JSON.parse(JSON.stringify(data[0])).split("},");
  // const List2 = JSON.parse(JSON.stringify(data[1])).split("},");
  // const channelList: ChannelType[] = [];
  // const roomList: RoomType[] = [];

  // if (List.length > 0 && channelList.length < List?.length) {
  //   for (let i = 0; i < List?.length; i++) {
  //     if (i !== List.length - 1) {
  //       channelList.push(JSON.parse(List[i] + "}"));
  //     } else {
  //       channelList.push(JSON.parse(List[i]));
  //     }
  //   }
  // }
  // if (List2.length > 0 && roomList.length < List2?.length) {
  //   for (let i = 0; i < List2?.length; i++) {
  //     if (i !== List2.length - 1) {
  //       roomList.push(JSON.parse(List2[i] + "}"));
  //     } else {
  //       roomList.push(JSON.parse(List2[i]));
  //     }
  //   }
  // }

  // if (!channelId) {
  //   let id;
  //   for (let i = 0; i < roomList.length; i++) {
  //     if (roomList[i]["type"] === 2) {
  //       id = roomList[i]["channel_id"];
  //       break;
  //     }
  //   }
  //   navigate(`/${channelId}/${id}`);
  // }

  const handleChange = (result: any) => {
    if (!result.destination) return;
    const items = [...dndCategoryList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDndCategoryList(items);
  };

  return (
    <div>
      <button onClick={showCreateChannelModal}>
        <AddIcon />
      </button>
      <button onClick={showCreateCategoryModal}>
        <AddIcon />
      </button>
      {/* category = channel / room -> channel */}
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="communities">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categoryList.map((category: any) => (
                <>
                  <CommunityLabel text={category.name} />
                  {channelList
                    .filter(
                      (channel: any) => category.id === channel.categoryId
                    )
                    .map((channel: any) => (
                      <>
                        <CommunityRoomButton
                          type={channel.type === 1 ? "VOICE" : "CHAT"}
                          text={channel.name}
                          communityId={communityId}
                          channelId={channel.id}
                        />
                        {channel.id === Number(channelId) && (
                          <UserChannelOnBox />
                        )}
                        {friendList.map((friend: FriendType) => (
                          <UserFriendChannelOnBox
                            friend={friend}
                            channelId={channel["channel_id"]}
                          />
                        ))}
                      </>
                    ))}
                  <button onClick={showPatchCategoryModal}>
                    <AddIcon />
                  </button>
                  <button onClick={showDeleteCategoryModal}>
                    <AddIcon />
                  </button>
                </>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Tab2CommunityBody;
