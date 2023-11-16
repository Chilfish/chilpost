-- Query: getAllPosts
Select *
From post_with_owner As p
Where is_body = True
Order By created_at;

-- Query: getPostByOwner
Select *
From post_with_owner As p
Where owner_id = :owner_id
  And is_body = True
Order By created_at;

-- Query: getComments
Select *
From post_with_owner As p
Where parent_id = :parent_id
  And is_body = False
Order By created_at;

-- Query: getParentPost
Select *
From post_status As p
Where post_id = :post_id;

-- Query: getPostById
Select *
From post_with_owner As p
Where id = :id
Order By created_at;

-- Query: insertPost
Insert Into posts (content, owner_id, parent_id, is_body)
Values (:content, :owner_id, :parent_id, :is_body);

-- Query: insertPostStatus
Insert Into post_status (post_id)
Values (:post_id);

-- Query: updateComment
Update post_status
Set comment_count = comment_count + 1,
    comments      = Json_Array_Append(comments, '$', :comment_id)
Where post_id = :post_id;

-- Query: updateUserPostCount
Update user_status
Set post_count = post_count + 1
Where user_id = :user_id;

-- Query: likePost
Update post_status
Set like_count = like_count + 1,
    likes      = Json_Array_Append(likes, '$', :user_id)
Where post_id = :post_id;

-- Query: unlikePost
Update post_status
Set like_count = like_count - 1,
    likes      = Json_Remove(likes, Json_Unquote(Json_Search(likes, 'one', :user_id)))
Where post_id = :post_id
  And Json_Search(likes, 'one', :user_id) Is Not Null;
