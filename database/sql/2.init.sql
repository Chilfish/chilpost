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
               'followings', us.followings
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
                    On u.id = pd.owner_id;
