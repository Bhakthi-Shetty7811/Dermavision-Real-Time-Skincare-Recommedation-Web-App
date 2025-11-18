import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def get_all_posts():
    posts_ref = db.collection("posts")
    docs = posts_ref.stream()

    for doc in docs:
        print(f"{doc.id} => {doc.to_dict()}")

def add_post(content, author_name="Anonymous"):
    post_ref = db.collection("posts").add({
        "content": content,
        "authorName": author_name,
        "createdAt": firestore.SERVER_TIMESTAMP,
        "upvotes": 0,
        "downvotes": 0
    })
    print(f"Post added with ID: {post_ref[1].id}")

if __name__ == "__main__":
    add_post("This is a test post", "User123")
    get_all_posts()

