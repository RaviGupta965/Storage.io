export const nav_item=[
    {name:'Dashboard',icons:'/assets/icons/dashboard.svg',url:'/'},
    {name:'Documents',icons:'/assets/icons/documents.svg',url:'/documents'},
    {name:'Images',icons:'/assets/icons/images.svg',url:'/images'},
    {name:'Media',icons:'/assets/icons/video.svg',url:'/media'},
    {name:'Others',icons:'/assets/icons/others.svg',url:'/others'},
]

export const actionsDropdownItems = [
    {
      label: "Rename",
      icon: "/assets/icons/edit.svg",
      value: "rename",
    },
    {
      label: "Details",
      icon: "/assets/icons/info.svg",
      value: "details",
    },
    {
      label: "Share",
      icon: "/assets/icons/share.svg",
      value: "share",
    },
    {
      label: "Download",
      icon: "/assets/icons/download.svg",
      value: "download",
    },
    {
      label: "Delete",
      icon: "/assets/icons/delete.svg",
      value: "delete",
    },
  ];
  
  export const sortTypes = [
    {
      label: "Date created (newest)",
      value: "$createdAt-desc",
    },
    {
      label: "Created Date (oldest)",
      value: "$createdAt-asc",
    },
    {
      label: "Name (A-Z)",
      value: "name-asc",
    },
    {
      label: "Name (Z-A)",
      value: "name-desc",
    },
    {
      label: "Size (Highest)",
      value: "size-desc",
    },
    {
      label: "Size (Lowest)",
      value: "size-asc",
    },
  ];
  
  export const avatarPlaceholderUrl =
    "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  
  export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB