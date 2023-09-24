-- Query: newPost
Insert Into posts (content, owner_id)
Values (:content, :owner_id);

-- Query: getPostByOwner
Select *
From posts
         Join post_status On posts.id = post_status.post_id
Where owner_id = :owner_id
  And deleted = False
Order By created_at Desc;
