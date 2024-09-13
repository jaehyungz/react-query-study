"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useMap } from "../hooks/useMap";
import { stat } from "fs";
import useMyLocation from "../hooks/useMyLocation";
import { mapData, roomList } from "../utils/dummy";

interface Props {}

// function geocodeAddress(address: string) {
//   return fetch(
//     `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
//       // address
//       "분당구"
//     )}`,
//     {
//       method: "GET",
//       headers: {
//         "X-NCP-APIGW-API-KEY-ID": "anqpnd87sh",
//         "X-NCP-APIGW-API-KEY": "Xulyxi8EWoMk63Us3ntRrHEgHxvGW5OGKlVgeBMt",
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "no-cors",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.addresses && data.addresses.length > 0) {
//         const location = data.addresses[0];
//         return {
//           lat: location.y,
//           lng: location.x,
//         };
//       } else {
//         throw new Error("no address in location " + address);
//       }
//     });
// }

async function test(query: string) {
  const res = await fetch(`/api/naver-map?query=${query}`);
  const result = await res.json();

  return result;
}

function Page(props: Props) {
  const {} = props;
  const location = useMyLocation();
  const mapRef = useMap();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  //   const mapRef = useRef<naver.maps.Map>(null);

  const handleSearchCenter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const map = mapRef.current ?? undefined;

    if (!map) return;
    const center = new naver.maps.LatLng(location.lat, location.lng);

    map.setCenter(center);

    const overlayElement = document.createElement("div");
    overlayElement.style.position = "absolute";
    overlayElement.style.left = "50%";
    overlayElement.style.top = "0";
    overlayElement.style.transform = "translateX(-50%)";
    overlayElement.style.width = "120px";
    overlayElement.style.height = "30px";
    overlayElement.style.lineHeight = "30px";
    overlayElement.style.textAlign = "center";
    overlayElement.style.backgroundColor = "#fff";
    overlayElement.style.border = "2px solid #f00";
    overlayElement.textContent = "커스텀오버레이";

    // overlayRef.current = overlayElement;

    const overlay = new naver.maps.OverlayView();
    overlay.onAdd = () => {
      const overlayLayer = overlay.getPanes().overlayLayer;
      overlayLayer.appendChild(overlayElement);
    };

    overlay.draw = () => {
      if (!overlay.getMap()) return;

      const projection = overlay.getProjection();
      const pixelPosition = projection.fromCoordToOffset(center);
      console.log(pixelPosition);

      overlayElement.style.left = `${pixelPosition.x}px`;
      overlayElement.style.top = `${pixelPosition.y}px`;
    };
    overlay.onRemove = () => {
      if (overlayElement.parentNode) {
        overlayElement.parentNode.removeChild(overlayElement);
      }
    };

    overlay.setMap(map);

    // const center = new naver.maps.LatLng(location.lat, location.lng);
    // const station = new naver.maps.LatLng(37.5296, 126.9638);
  };

  const handleLocation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const map = mapRef.current ?? undefined;

    if (!map) return;
    e.preventDefault();
    const center = new naver.maps.LatLng(location.lat, location.lng);
    // const station = new naver.maps.LatLng(37.5296, 126.9638);

    // console.log(center);
    map.setCenter(center);

    const marker = new naver.maps.Marker({
      position: center,
      map,
    });

    const contentString = [
      '<div class="iw_inner">',
      "<h3>서울특별시청</h3>",
      "</div>",
    ].join("");

    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      console.log("marker Click");
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });
  };

  const createMarkers = () => {
    const map = mapRef.current ?? undefined;

    if (!map) return;
    const position = new naver.maps.LatLng(37.4899316, 127.0298818);

    const marker = new naver.maps.Marker({
      position,
      map,
      icon: {
        url: "https://stay.epsd.co.kr/icon/ic_map_marker.svg",
        size: new naver.maps.Size(75, 45),
        // scaledSize: new naver.maps.Size(37.5, 22.5),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(0, 45),
      },
    });

    // roomList
    //   .map((item) => {
    //     return {
    //       roomTypeName: item.roomTypeName,
    //       roomTitle: item.roomTitle,
    //       roomDesc: item.roomDesc,
    //       center: new naver.maps.LatLng(
    //         item.randomLocation.lat,
    //         item.randomLocation.lng
    //       ),
    //     };
    //   })
    //   .forEach((room) => {
    //     const marker = new naver.maps.Marker({
    //       position: room.center,
    //       map,
    //     });

    //     naver.maps.Event.addListener(marker, "click", () => {
    //       map.setCenter(room.center);
    //       map.setZoom(15);
    //     });
    //   });
  };

  const createOverlay = () => {
    const map = mapRef.current ?? undefined;

    if (!map) return;

    roomList
      .map((item) => {
        return {
          roomTypeName: item.roomTypeName,
          roomTitle: item.roomTitle,
          roomDesc: item.roomDesc,
          center: new naver.maps.LatLng(
            item.randomLocation.lat,
            item.randomLocation.lng
          ),
        };
      })
      .forEach((room) => {
        const overlay = new naver.maps.OverlayView();

        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");
        // overlayElement.style.position = "absolute";
        // overlayElement.style.left = "50%";
        // overlayElement.style.top = "0";
        // overlayElement.style.transform = "translateX(-50%)";
        // overlayElement.style.width = "auto";
        // overlayElement.style.height = "30px";
        // overlayElement.style.lineHeight = "30px";
        // overlayElement.style.textAlign = "center";
        // overlayElement.style.backgroundColor = "#fff";
        // overlayElement.style.border = "2px solid #f00";
        overlayElement.textContent = room.roomTitle;

        // overlayRef.current = overlayElement;

        overlay.onAdd = () => {
          const overlayLayer = overlay.getPanes().overlayLayer;
          overlayLayer.appendChild(overlayElement);
        };

        overlay.draw = () => {
          if (!overlay.getMap()) return;

          const projection = overlay.getProjection();
          const pixelPosition = projection.fromCoordToOffset(room.center);

          overlayElement.style.left = `${pixelPosition.x}px`;
          overlayElement.style.top = `${pixelPosition.y}px`;
        };
        overlay.onRemove = () => {
          if (overlayElement.parentNode) {
            overlayElement.parentNode.removeChild(overlayElement);
          }
        };

        overlay.setMap(map);
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const value = inputRef.current?.value;
    e.preventDefault();
    if (!value?.length) return;

    test(value)
      .then((a) => console.log(a))
      .catch((e) => console.error(e));

    // geocodeAddress(value)
    //   .then((val) => console.log(val))
    //   .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    createMarkers();
    // createOverlay();
  }, []);

  return (
    <div className="map" id="map">
      {/* <div ref={overlayRef} /> */}

      <button className="location-2" onClick={handleSearchCenter}>
        커스텀 오버레이 표시하기
      </button>

      <button className="location" onClick={handleLocation}>
        마커표시하고 infoWindow 호출
      </button>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" ref={inputRef} />
      </form>

      <div className="text">
        {location.lat} {location.lng}
      </div>
    </div>
  );
}

export default Page;
