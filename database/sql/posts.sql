-- Query: newPost
Insert Into posts (content, owner_id)
Values (:content, :owner_id);

-- Query: getPostByOwner
Select *
From post_with_user As p
Where p.owner_id = :owner_id;

-- Query: getPostById
Select *
From post_with_user As p
Where p.post_id = :id;