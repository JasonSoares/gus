defmodule GUS.Urls.LinkTest do
  @moduledoc false

  use GUS.DataCase, async: true

  alias GUS.Urls.Link

  describe "changeset/2" do
    test "valid urlt" do
      link = %Link{}
      changeset = Link.changeset(link, %{url: "https://www.example.com"})
      assert changeset.valid?
      assert String.length(changeset.changes.slug) > 0
    end

    test "missing url scheme" do
      link = %Link{}
      changeset = Link.changeset(link, %{url: "www.example.com"})
      assert %{url: ["is expected to start with http or https"]} = errors_on(changeset)
    end

    test "missing url host" do
      link = %Link{}
      changeset = Link.changeset(link, %{url: "https://"})
      assert %{url: ["is expected to include the host"]} = errors_on(changeset)
    end

    test "unsupported url scheme" do
      link = %Link{}
      changeset = Link.changeset(link, %{url: "ftp://www.example.com"})
      assert %{url: ["is expected to start with http or https"]} = errors_on(changeset)
    end

    test "missing url" do
      link = %Link{}
      changeset = Link.changeset(link, %{url: nil})
      assert %{url: ["can't be blank"]} = errors_on(changeset)
    end
  end
end
