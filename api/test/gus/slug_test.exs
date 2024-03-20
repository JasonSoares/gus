defmodule GUS.SlugTest do
  use ExUnit.Case

  test "generates a random slug of a given length" do
    assert String.length(GUS.Slug.random(6)) == 6
  end

  test "raises an error if the length is less than 6" do
    assert_raise ArgumentError, "Slug length must be >= 6", fn ->
      GUS.Slug.random(5)
    end
  end
end
