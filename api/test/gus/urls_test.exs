defmodule GUS.UrlsTest do
  @moduledoc false

  use GUS.DataCase, async: true

  alias GUS.Urls

  describe "links" do
    alias GUS.Urls.Link

    import GUS.UrlsFixtures

    @invalid_attrs %{url: nil, slug: nil}

    test "list_links/0 returns all links" do
      link = link_fixture()
      assert Urls.list_links() == [link]
    end

    test "get_link!/1 returns the link with given id" do
      link = link_fixture()
      assert Urls.get_link!(link.id) == link
    end

    test "get_link!/1 raises Ecto.NoResultsError if link does not exist" do
      assert_raise Ecto.NoResultsError, fn -> Urls.get_link!(0) end
    end

    test "get_by_slug!/1 returns the link with given slug" do
      link = link_fixture()
      assert Urls.get_by_slug!(link.slug) == link
    end

    test "get_by_slug!/1 raises Ecto.NoResultError if link does not exist" do
      assert_raise Ecto.NoResultsError, fn -> Urls.get_by_slug!("nonexistent") end
    end

    test "create_link/1 with valid data creates a link" do
      valid_attrs = %{url: "https://www.example.com"}

      assert {:ok, %Link{} = link} = Urls.create_link(valid_attrs)
      assert link.url == "https://www.example.com"
      assert String.length(link.slug) != 0
    end

    test "create_link/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Urls.create_link(@invalid_attrs)
    end

    test "create_visit/1 creates a visit for the link" do
      link = link_fixture()
      assert {:ok, %Urls.Visit{}} = Urls.create_visit(link)
    end

    test "create_visit/1 increments the visit_count for the link" do
      link = link_fixture()
      assert link.visit_count == 0

      Urls.create_visit(link)
      assert Urls.get_by_slug!(link.slug).visit_count == 1

      Urls.create_visit(link)
      assert Urls.get_by_slug!(link.slug).visit_count == 2
    end

    test "create_visit/1 returns error changeset if link does not exists" do
      assert {:error, %Ecto.Changeset{}} = Urls.create_visit(%Link{id: 0})
    end

    test "delete_link/1 deletes the link" do
      link = link_fixture()
      assert {:ok, %Link{}} = Urls.delete_link(link)
      assert_raise Ecto.NoResultsError, fn -> Urls.get_link!(link.id) end
    end

    test "change_link/1 returns a link changeset" do
      link = link_fixture()
      assert %Ecto.Changeset{} = Urls.change_link(link)
    end
  end
end
