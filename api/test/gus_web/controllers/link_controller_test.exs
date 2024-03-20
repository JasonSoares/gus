defmodule GUSWeb.LinkControllerTest do
  use GUSWeb.ConnCase, async: true

  import GUS.UrlsFixtures

  @create_attrs %{
    url: "https://www.example.com"
  }

  @invalid_attrs %{url: nil, slug: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "list links" do
    setup [:create_link]

    test "renders list of links", %{conn: conn, link: link} do
      slug = link.slug
      url = link.url
      conn = get(conn, ~p"/api/links")

      assert %{
               "data" => [
                 %{
                   "slug" => ^slug,
                   "url" => ^url
                 }
               ]
             } = json_response(conn, 200)
    end
  end

  describe "create link" do
    test "renders link when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/links", link: @create_attrs)
      assert %{"slug" => slug} = json_response(conn, 201)["data"]

      [location | _] = get_resp_header(conn, "location")
      assert location == ~p"/api/links/#{slug}"

      conn = get(conn, location)

      assert %{
               "slug" => ^slug,
               "url" => "https://www.example.com"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/links", link: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "show link" do
    setup [:create_link]

    test "renders link when link exists", %{conn: conn, link: link} do
      id = link.id
      slug = link.slug
      url = link.url

      conn = get(conn, ~p"/api/links/#{link}")

      assert %{
               "id" => ^id,
               "slug" => ^slug,
               "url" => ^url
             } = json_response(conn, 200)["data"]
    end

    test "renders 404 when link does not exist", %{conn: conn} do
      assert_error_sent 404, fn ->
        get(conn, ~p"/api/links/0")
      end
    end
  end

  defp create_link(_) do
    link = link_fixture()
    %{link: link}
  end
end
