defmodule GusWeb.VisitControllerTest do
  use GUSWeb.ConnCase, async: true

  import GUS.UrlsFixtures

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create visit" do
    setup [:create_link]

    test "renders visit when link exists", %{conn: conn, link: link} do
      url = link.url
      conn = post(conn, ~p"/api/links/#{link.slug}/visits")
      assert %{"url" => ^url} = json_response(conn, 201)["data"]
    end

    test "renders 404 when link does not exist", %{conn: conn} do
      assert_error_sent 404, fn ->
        post(conn, ~p"/api/links/invalid-slug/visits")
      end
    end
  end

  defp create_link(_) do
    link = link_fixture()
    %{link: link}
  end
end
