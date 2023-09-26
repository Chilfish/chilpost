Create Trigger If Not Exists post_status_insert
  After Insert
  On posts
  For Each Row
Begin
  Insert Into post_status (post_id) Values (NEW.id);
  Update user_status As us
  Set post_count = post_count + 1
  Where us.user_id = NEW.owner_id;
End;

Create Trigger If Not Exists update_comment_count
  After Insert
  On posts
  For Each Row
Begin
  If NEW.parent_id Is Not Null Then
    Update post_status As ps
    Set comment_count = comment_count + 1,
        comments      = Json_Array_Append(comments, '$', New.id)
    Where ps.post_id = NEW.parent_id;
  End If;
End;

Create Trigger If Not Exists user_status_insert
  After Insert
  On users
  For Each Row
Begin
  Insert Into user_status (user_id) Values (1);
End;

Create View user_details As
Select u.id,
       u.name,
       u.nickname,
       u.password,
       u.avatar,
       u.bio,
       u.email,
       u.created_at,
       u.deleted,
       Json_Object(
           'post_count', us.post_count,
           'follower_count', us.follower_count,
           'following_count', us.following_count,
           'followers', us.followers,
           'following', us.following
         ) As status
From users As u
       Inner Join user_status As us
                  On us.user_id = u.id;

Create View post_details As
Select p.id,
       p.content,
       p.created_at,
       p.is_body,
       p.parent_id,
       p.owner_id,
       Json_Object(
           'likes', ps.likes,
           'comments', ps.comments,
           'reposts', ps.reposts,
           'like_count', ps.like_count,
           'comment_count', ps.comment_count,
           'repost_count', ps.repost_count
         ) As status
From posts As p
       Inner Join post_status As ps
                  On ps.post_id = p.id;

Create View post_with_owner As
Select pd.id,
       pd.content,
       pd.created_at,
       pd.is_body,
       pd.parent_id,
       pd.owner_id,
       pd.status,
       Json_Object(
           'id', u.id,
           'name', u.name,
           'nickname', u.nickname,
           'avatar', u.avatar
         ) As owner
From post_details As pd
       Inner Join users As u
                  On u.id = pd.owner_id
Group By pd.id;
