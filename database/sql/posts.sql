-- new a post

Insert Into posts (content, owner_id)
Values (:content, :owner_id);


-- get posts by user id

Select *
From posts
         Join post_status On posts.id = post_status.post_id
Where owner_id = :owner_id
  And deleted = False
Order By created_at Desc;
