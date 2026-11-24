PW = "correct-horse-1"


def register(client, email="ana@example.com", name="Ana", password=PW):
    return client.post("/api/auth/register", json={"email": email, "display_name": name, "password": password})


def auth(token):
    return {"Authorization": f"Bearer {token}"}


def test_register_returns_token_and_user_without_password(client):
    r = register(client)
    assert r.status_code == 201
    body = r.json()
    assert body["user"]["email"] == "ana@example.com"
    assert body["access_token"]
    assert "hashed_password" not in body["user"] and "password" not in body["user"]


def test_duplicate_email_rejected_case_insensitive(client):
    register(client)
    assert register(client, email="ANA@example.com").status_code == 409


def test_weak_or_invalid_input_rejected(client):
    assert register(client, password="short").status_code == 422
    assert register(client, email="not-an-email").status_code == 422
    assert register(client, name="   ").status_code == 422


def test_login_success_and_failure(client):
    register(client)
    ok = client.post("/api/auth/login", json={"email": "ana@example.com", "password": PW})
    assert ok.status_code == 200 and ok.json()["access_token"]
    assert client.post("/api/auth/login", json={"email": "ana@example.com", "password": "nope-nope-1"}).status_code == 401
    assert client.post("/api/auth/login", json={"email": "who@example.com", "password": PW}).status_code == 401


def test_me_requires_valid_token(client):
    assert client.get("/api/users/me").status_code == 401
    assert client.get("/api/users/me", headers=auth("garbage")).status_code == 401
    token = register(client).json()["access_token"]
    me = client.get("/api/users/me", headers=auth(token))
    assert me.status_code == 200 and me.json()["display_name"] == "Ana"


def test_update_profile(client):
    token = register(client).json()["access_token"]
    r = client.patch("/api/users/me", headers=auth(token), json={"display_name": " Ana B ", "bio": "hello", "location": "Delhi"})
    assert r.status_code == 200
    assert r.json()["display_name"] == "Ana B" and r.json()["bio"] == "hello" and r.json()["location"] == "Delhi"
    r = client.patch("/api/users/me", headers=auth(token), json={"bio": ""})
    assert r.json()["bio"] is None and r.json()["display_name"] == "Ana B"


def test_change_password(client):
    token = register(client).json()["access_token"]
    bad = client.post("/api/users/me/password", headers=auth(token), json={"current_password": "wrong-one-1", "new_password": "brand-new-pass-2"})
    assert bad.status_code == 400
    good = client.post("/api/users/me/password", headers=auth(token), json={"current_password": PW, "new_password": "brand-new-pass-2"})
    assert good.status_code == 204
    assert client.post("/api/auth/login", json={"email": "ana@example.com", "password": PW}).status_code == 401
    assert client.post("/api/auth/login", json={"email": "ana@example.com", "password": "brand-new-pass-2"}).status_code == 200
