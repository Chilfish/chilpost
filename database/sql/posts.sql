-- Query: getAllPosts
Select *
From post_with_owner As p
Where is_body = True
Order By created_at Desc;

-- Query: getPostByOwner
Select *
From post_with_owner As p
Where owner_id = :owner_id
  And is_body = True
Order By created_at Desc;

-- Query: getPostById
Select *
From post_with_owner As p
Where id = :id
Order By created_at Desc;

-- Query: insertPost
Insert Into posts (content, owner_id)
Values (:content, :owner_id);

-- Query: insertComment
Insert Into posts (content, owner_id, parent_id, is_body)
Select :content, :owner_id, :parent_id, False
Where Exists (Select 1 From posts Where id = :parent_id)
  And Exists(Select 1 From users Where id = :owner_id);

-- Query: likePost
Update post_status
Set like_count = like_count + 1,
    likes      = Json_Array_Append(likes, '$', :user_id)
Where post_id = :post_id;