defmodule GUS.Urls do
  @moduledoc """
  The Urls context.
  """

  import Ecto.Query, warn: false

  alias GUS.Repo
  alias GUS.Urls.Link
  alias GUS.Urls.Visit

  @doc """
  Returns the list of links.
  """
  @spec list_links() :: [%Link{}]
  def list_links do
    Repo.all(Link)
  end

  @doc """
  Gets a single link.

  Raises `Ecto.NoResultsError` if the Link does not exist.
  """
  @spec get_link!(integer()) :: %Link{}
  def get_link!(id), do: Repo.get!(Link, id)

  @doc """
  Gets a link by its slug.

  Raises `Ecto.NoResultsError` if the Link does not exist.
  """
  @spec get_by_slug!(String.t()) :: %Link{}
  def get_by_slug!(slug), do: Repo.get_by!(Link, slug: slug)

  @doc """
  Creates a link.
  """
  @spec create_link(map()) :: {:ok, %Link{}} | {:error, Ecto.Changeset.t()}
  def create_link(attrs \\ %{}) do
    %Link{}
    |> Link.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates a visit for a link.
  """
  @spec create_visit(%Link{}) :: {:ok, %GUS.Urls.Visit{}} | {:error, Ecto.Changeset.t()}
  def create_visit(%Link{} = link) do
    %Visit{link_id: link.id}
    |> Visit.changeset(%{})
    |> Repo.insert()
  end

  @doc """
  Deletes a link.
  """
  @spec delete_link(%Link{}) :: {:ok, %Link{}} | {:error, Ecto.Changeset.t()}
  def delete_link(%Link{} = link) do
    Repo.delete(link)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking link changes.
  """
  def change_link(%Link{} = link, attrs \\ %{}) do
    Link.changeset(link, attrs)
  end
end
