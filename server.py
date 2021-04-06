from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


@app.route("/")
def root():
    """Show the application's homepage."""

    return render_template("root.html")

# All routes below are API endpoints

@app.route("/api/top-posts")
def get_top_posts():
    #here you get top posts from the DB - use crud file.  Then do the following:
    top_posts = [
    {"id": 93, "title": "why kiwis are the best fruit", "body": "body text for p1"},
    {"id": 783, "title": "typesetting in the 19th century", "body": "body text for p2"},
    {"id": 1383, "title": "debugging, a lifes tale", "body": "body text for p3"}
    ]

    return jsonify(top_posts)

#example of how to post to database
@app.route("/api/post", methods=["POST"])
def post():
    
   #I'm expecting to get this as JSON in request:
    #{"post_title": "post_1", "post_body": "stuf stuf stuf"}

    data = request.get_json()
    #this will parse the body of what I got from the FE as JSON. 
    #we use request.args.get if it's a query string...?
    post_title = data.post_title
    post_body = data.post_body
    #then do database stuff to put a post into your DB - crud

    #note that you can conditionally return diff things:
    #if not in the db:
        #return jsonify('okay')
    #else:
        #return jsonify('not okay')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
