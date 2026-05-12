/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { 
  Download, 
  Image as ImageIcon, 
  Layout, 
  Users, 
  Trophy, 
  Trash2, 
  Plus,
  ChevronRight,
  Monitor,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Format, StoryType, Practice, PRACTICE_COLORS, PRACTICE_LABELS, FORMAT_DIMENSIONS, ResultEntry, Slide } from './constants';

// Constants for assets
const ATHLE_LOGO_BASE64 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYWxxdWVfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNjgyLjAzIDE0MTIuNTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2ODIuMDMgMTQxMi41NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwNTYxQTQ7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03NC44NCwxMjQ0LjMxYzE4LjM1LTczLjg3LDQzLjE3LTE0NS43LDY5LjI5LTIxNy4wN2MyNC4xOC02Ni4wNSw0OS4xMy0xMzEuODIsNzQuNDMtMTk3LjQ1ICAgYzE1Ljc0LTQwLjgyLDMyLjI1LTgxLjQxLDU1LjU2LTExOC43MWMxMi45NC0yMC43LDI2LjA5LTQxLjM0LDQ1LjYyLTU2LjgxYzguODEtNi45OCwxOC4zOS0xMi41NiwyOS40Mi0xNC45MiAgIGM0LjgtMS4wMywxMC4zMS0xLjg2LDE0LjgzLTAuNTJjMTkuMzgsNS43NCwzNi45MywxNC45Nyw1MC44NiwzMC4xMWMxMi43NSwxMy44NSwxMS44OCwyOS4zMyw2LjE2LDQ1LjggICBjLTYuMzksMTguNDQtMTUuNzIsMzUuMzUtMjYuMDEsNTEuNzZjLTM2Ljg5LDU4Ljg3LTY3LjcsMTIxLjAxLTk5LjU5LDE4Mi42MWMtNDEuNjIsODAuMzctODQuMDksMTYwLjMxLTEyNi42MSwyNDAuMjEgICBjLTE3LjczLDMzLjMxLTM3LjYyLDY1LjM4LTYwLjQ5LDk1LjQ3Yy02LjcsOC44MS0xNC40LDE2Ljg2LTIxLjUyLDI1LjM3Yy0xLjMyLDEuNTctMTEuOTgsMTguNjEtMTkuOTYsNS41MSAgIEM1OC44NywxMzAyLjU3LDcyLjUyLDEyNTMuNjQsNzQuODQsMTI0NC4zMXoiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01ODEuNzcsOTEuOThjMy41LDEuODEsNi44NSw0LjA2LDEwLjUzLDUuMzZjMzkuMzYsMTMuOTIsNjIuODYsNDEuNzcsNjkuNTYsODIuNTMgICBjMy44NywyMy41MS0zLjk0LDQ1LjgtMTguMDMsNjQuM2MtMjguMjgsMzcuMTMtNjUuNyw1NS43NS0xMTMuNSw1MS43M2MtMjguNDktMi40LTUyLjIzLTEzLjU1LTcwLjY2LTM1LjAxICAgYy0yOS41OS0zNC40Ni0zMS4yNi03Ni4xOC01LjI5LTExNi4zMmMxNi40NC0yNS40MSw0MC4wNS00MC45LDY4Ljk3LTQ4LjgzYzMuMDMtMC44Myw1Ljg0LTIuNDksOC43NS0zLjc2ICAgQzU0OC42NSw5MS45OCw1NjUuMjEsOTEuOTgsNTgxLjc3LDkxLjk4eiI+PC9wYXRoPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2MTcuNjYsNTU4LjQzYy0yMi4xOSw1LTQ0LjI3LDEwLjU4LTY2LjYxLDE0LjgyYy0xNi42MSwzLjE1LTMzLjUzLDQuNzIlNTAuMzUsNi42NiAgIGMtNS43NywwLjY3LTguMjMsMy4xMy03Ljc1LDguOTljMS4zNywxNi42OSwyLjY3LDMzLjM5LDMuNzMsNTAuMWMwLjMyLDUuMDcsMi4xNyw2Ljk4LDcuNDIsNi43M2MxNi4xMy0wLjc2LDMyLjI4LTEuMSw0OC40Mi0xLjU5ICAgYzEuOTYtMC4wNiwzLjkzLTAuMDEsNi4zLTAuMDFjMS43MiwxNy43OSwzLjM5LDM1LjEzLDUuMDEsNTEuOTZjLTIxLjE5LDAtNDEuOTQsMC4xOS02Mi42Ny0wLjEzYy01LjQtMC4wOC03LjM0LDEuODgtNy4xOSw2Ljg5ICAgYzAuNjEsMTkuOTcsMS4zNCwzOS45NCwxLjcyLDU5LjkxYzAuMTIsNi4yNSwyLjksNy42NCw4LjY1LDcuMzRjMjUuNi0xLjMzLDUxLjIxLTIuMzEsNzYuODItMy4zOWMyLjE4LTAuMDksNC4zNi0wLjAxLDcuOTQtMC4wMSAgIGMwLDExLjY2LDAuMTUsMjIuOS0wLjIzLDM0LjExYy0wLjA0LDEuMTUtMy4yMywzLjA4LTUuMDIsMy4xNWMtMjYuMDIsMS01Mi4wNCwxLjkzLTc4LjA4LDIuNDdjLTE3LjMxLDAuMzYtMzQuNjQsMC4wNy01My4zMiwwLjA3ICAgYy0zLjAyLTkxLjY5LTIuMjQtMTg0LjItMi45OS0yNzcuNjZjNTYuMzktMy44OSwxMTIuMjktNy43NSwxNjguMTgtMTEuNkMxNjE3LjY2LDUzMC45NywxNjE3LjY2LDU0NC43LDE2MTcuNjYsNTU4LjQzeiI+PC9wYXRoPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcxMi4yNCw5NTYuMzVjMS4wNywxMy42OC0zLjkzLDI1LjQtOS45LDM2LjY4Yy0xMy40MSwyNS4zLTMyLjc1LDQ1Ljk0LTUzLjEzLDY1LjU4ICAgYy0yNi4yMiwyNS4yNy01NS4yMiw0Ny4wMy04NS40NSw2Ny4zYy00Mi40MywyOC40Ni04NS44OCw1NS4xNi0xMzEuMzcsNzguNDJjLTcuNzgsMy45OC0xNi40NCw3LTI1LjAzLDguMzcgICBjLTUuNCwwLjg2LTEyLjQ2LTAuNjctMTYuOTQtMy43N2MtMTAuMTItNy4wMS05LjU5LTExLjA4LTQuNjctMTkuNTJjMTIuNS0yMS40NywzMC4xOC0zOC4zMSw0OC4wOS01NC45ICAgYzM5LjgzLTM2Ljg4LDgwLjAxLTczLjM4LDExOS45MS0xMTAuMTljMTIuNjQtMTEuNjYsMjQuMTItMjQuNDEsMzIuNjQtMzkuNTNjNC43MS04LjM3LDQuNTktMTEuOTQtMy45NS0xNi4zMiAgIGMtMTUuMTgtNy43OC0zMC43OS0xNC44Ny00Ni42Ny0yMS4xM2MtMjguMy0xMS4xNS01Ny4xMS0yMS4wMy04NS4zMi0zMi4zOGMtOS43OC0zLjk0LTE4Ljg4LTEwLjA1LTI3LjUyLTE2LjI1ICAgYy0xOC4wMy0xMi45NS0yMS42LTIyLjAxLTE0LjQ3LTQzLjEzYzUuNDUtMTYuMTMsMTMuMjgtMzEuNSwyMC43NC00Ni44OGM0LjAzLTguMywxMS41NS0xMy4wNSwyMC40LTE1Ljk4ICAgYzIxLjQyLTcuMDgsNDIuMDUtMi44MSw2MSw2LjY3YzI1LjE5LDEyLjYsNDkuNzUsMjYuNzEsNzMuNTcsNDEuNzhjMzMuMzksMjEuMTMsNjYuMDcsNDMuNDIsOTguNTYsNjUuOTIgICBjNy45Niw1LjUxLDE0Ljc2LDEzLjE3LDIwLjc2LDIwLjg4QzcwOS44Myw5MzYuMTQsNzEzLjc4LDk0NS44LDcxMi4yNCw5NTYuMzV6Ij48L3BhdGg+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTI1LjQyLDU1NC43MmMwLjE4LTQ0LjY0LDMuMTItODkuMSw5LjMyLTEzMy4zMmMxLjktMTMuNTUsMy42LTI3LjIzLDYuODktNDAuNDggICBjMTAuMS00MC41OSwzNy4zMy02NS4wMSw3Ni4zMi03Ni44MmMzMy44NS0xMC4yNiw2OC43OC0xMS40MiwxMDMuNzctOC42OWMyOC45MywyLjI2LDU3Ljg0LDUuMTgsODYuNjEsOC45ICAgYzE5LjYyLDIuNTMsMzguNjgsOC4xNyw1Ni41NywxNi44NWMxNC4zMyw2Ljk2LDIzLjk4LDE4LjA0LDI3LjIsMzQuMTdjMy4wNiwxNS4zNi0yLjMyLDI3LjU4LTE0LjMxLDM2LjY5ICAgYy0xNi41OCwxMi42MS0zNi4zNSwxNi44OS01Ni40NiwxOS41NmMtMzYuMjksNC44MS03MS40LTMuMTEtMTA2LjYtMTAuMTZjLTExLjY0LTIuMzMtMjMuNC00LjE3LTM1LjE5LTUuNTYgICBjLTI0LjktMi45My0zNy4yOSwxMC4yNC00Mi4yLDMzLjI1Yy04LjgzLDQxLjM3LTE2LjYyLDgzLTI2Ljc0LDEyNC4wNmMtOC44OSwzNi4wNS0yMS40OSw3MS4wNi00MS40NCwxMDIuNzggICBjLTQuMDcsNi40OC0xMC4zMiwxMS42Ny0xNS45NiwxNy4wNGMtMywyLjg2LTYuOTgsMS43Ny05LjA3LTEuMjRjLTMuOTYtNS42OS04LjE2LTExLjU1LTEwLjQ4LTE3Ljk4ICAgYy02LjE1LTE3LjA1LTcuNi0zNS4wNC04LjEzLTUzLjAxQzEyNS4wNiw1ODUuNDIsMTI1LjQyLDU3MC4wNiwxMjUuNDIsNTU0LjcyeiI+PC9wYXRoPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUyNC43LDUwMy4yNGMtMC4yMy0xNC45NSwyLjczLTI5LjMsOS4wMS00Mi44MmMxLjc5LTMuODYsNC42Mi03LjgyLDguMDMtMTAuMjUgICBjMTAuMTQtNy4yNCwxNi45Mi02LjQ4LDI0LjQzLDMuNWM5LjIsMTIuMjIsMTcuMDYsMjUuNDQsMjYuMTEsMzcuNzhjNi44Nyw5LjM3LDE0LjI2LDE4LjQ2LDIyLjI0LDI2LjkgICBjNS43Myw2LjA3LDEyLjU5LDcuMzgsMjEuMzIsMy4mNmMyMi4wMy05LjYzLDM5LjYxLTI0LjU2LDU1LjAxLTQyLjQ4YzI5LjE4LTMzLjk2LDU4LTM4LjIyLDg3LjUyLTEwMS44OCAgIGMxMS44LTEzLjQ2LDI0LjY2LTI2LjA4LDM3Ljg1LTM4LjE5YzQuMjMtMy44OCwxMC45Ni01LjQyLDE2LjgyLTcuMDRjNC45LTEuMzUsNy42NiwxLjE1LDYuNjksNi42OSAgIGMtMy4yOCwxOC44My01LjUxLDM3LjktOS45NSw1Ni40NWMtMTAuNzUsNDQuOTctMjcuOTcsODcuNDktNTIuMTksMTI2Ljk3Yy0yNC44Myw0MC40OC01Ni40OSw3NC4xNi05OS43OSw5NS4xICAgYy0yMC4zMSw5LjgyLTQxLjM4LDE3LjgtNjQuNzgsMTcuNDZjLTIxLjMyLTMuMzEtMzguMTQtOS40Ni01MS44LTI0Ljc1Yy0xNS41OC0xNy40NS0yMy4yMi0zOS4wMi0yOC43NS02MS4yNiAgIGMtMy4yMy0xNC45OS02LjMxLTMwLjI2LTkuNDEtNDUuNEM1MjMuNiw1MDMuNDcsNTI0LjE1LDUwMy4zNiw1MjQuNyw1MDMuMjR6Ij48L3BhdGg+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTA5OC43OSw4MjAuMTljLTQuNjcsMC4yNC04LjQ4LDAuNjMtMTIuMjgsMC42Yy0xNC43NC0wLjEtMjkuNDctMC4zMi00NC4yMS0wLjUyICAgYy01LjYxLTAuMDctNy4yNC0yLjA2LTYuOTgtNy44MWMwLjQ4LTEwLjg3LDEuMDItMjEuNzUsMS4xOC0zMi42M2MwLjg2LTU2LjcyLDEuNDEtMTEzLjQ0LDIuNS0xNzAuMTVjMC40Ni0yNCwyLTQ3Ljk4LDMtNzEuOTggICBjMC41Ny0xMy44NywwLjUyLTEzLjc5LTEzLjA0LTEzLjhjLTkuODktMC4wMS0xOS43OS0wLjA0LTI5LjY2LTAuNDljLTkuMDktMC40Mi05LjQtMC44OC0xMC4yMS05LjgxICAgYy0xLjI5LTE0LjI2LTIuMzQtMjguNTUtMy42NS00Mi44MWMtMC42Ni03LjE3LTEuNjgtMTQuMy0yLjctMjIuNzRjMTI2LjQzLTMuMzMsMjUyLjQyLTYuNjQsMzc5LjYzLTkuOTkgICBjLTEuNTYsMTMuMy0yLjY3LDI1LjQ4LTQuNzgsMzcuNDljLTAuMywxLjctNS4zOCwzLjM1LTguMzgsMy42N2MtMTMuODQsMS40NC0yNy43NCwyLjI5LTQxLjYxLDMuNTMgICBjLTM4Ljk3LDMuNDctNzcuNTMsNy4wOS0xMTYuMzEsMTAuNTNjLTMxLjU1LDIuOC02My4xMSw1LjQzLTk0LjY2LDguMTNjLTguOTksMC43Ny05LjYyLDEuMjMtOS4xOSwxMC4wOSAgIGMyLjQyLDQ5Ljk5LDUuMjcsOTkuOTUsNy4zMiwxNDkuOTVjMS40OSwzNi4zLDEuOTYsNzIuNjQsMi45LDEwOC45NmMwLjM3LDE0LjMyLDAuNzYsMjguNjUsMS4xMyw0Mi45NyAgIEMxMDk4Ljg0LDgxNS4zNiwxMDk4Ljc5LDgxNy4zNSwxMDk4Ljc5LDgyMC4xOXoiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTA1LjY0LDUyNC41M2MxMi4zNywwLDI0LjQxLDAsMzYuOTcsMGMwLjExLDAuODEsMC40OSwyLjE0LDAuNDUsMy40NWMtMC44NCwyNi4yMy0xLjYyLDUyLjQ2LTIuNjUsNzguNjkgICBjLTAuNjgsMTcuMjctMC44NCwxNy4yMiwxNi4yMywxNy41MWMxNC43NCwwLjI1LDI5LjQ3LDAuNzIsNDQuMjEsMC44NmM2LjkyLDAuMDYsNy4zOC0wLjkzLDYuOTUtNy45MSAgIGMtMS45LTMxLjAyLTMuNjktNjIuMDUtNS41LTkzLjA4Yy0wLjA5LTEuNTgtMC4wMS0zLjE2LTAuMDEtNS45MmMyMC4xNywwLDQwLDAsNTkuNzUsMGMtNS4zLDI5LjIzLTYuMDYsNTkuMjgtNS44Nyw4OS4zMyAgIGMwLjQyLDY0LjgxLDEuMjksMTI5LjYyLDIuMDUsMTk0LjQyYzAuMTEsOS41NiwwLjI5LDkuNjYtOS4yMyw5LjY5Yy0yMC4zNywwLjA3LTQwLjc0LDAuMDItNjIuMDcsMC4wMiAgIGMxLjk4LTM1LjI4LDMuOTktNzEuMTgsNi4wNi0xMDguMTJjLTEyLjEzLDAtMjMuMzMtMC4xMi0zNC41MiwwLjE5Yy0xLjAyLDAuMDMtMi43MSwyLjczLTIuODIsNC4yOCAgIGMtMC40NSw2LjIzLTAuNTksMTIuNS0wLjUyLDE4Ljc1YzAuMjksMjcuODYsMC42NCw1NS43MiwxLjEyLDgzLjU4YzAuMDcsMy45Ny0wLjQyLDYuNzItNS4yNSw2LjY5ICAgYy0xNC44OS0wLjA3LTI5Ljc5LTAuMDMtNDUuNTItMC4wM2MxLjc4LTQ3LjM5LDUtOTYuMDksNS4wNC0xNDQuOEMxMTEwLjU2LDYyMy4zMywxMTA3LjQzLDU3NC41MywxMTA1LjY0LDUyNC41M3oiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04MzUuODYsODEwLjY4YzEuOTYtMTEuMjQsMy41OC0yMS4zNCw1LjQ5LTMxLjM5YzcuMjEtMzguMDEsMTMuNjgtNzYuMTksMjIuMDEtMTEzLjk1ICAgYzkuMTEtNDEuMjUsMjQuMzMtODAuNSw0MS4zMy0xMTkuMmM0LjY4LTEwLjY2LDEwLjQxLTEzLjI4LDIwLjUzLTE0LjA4YzE4Ljg3LTEuNDgsMzcuNjUtNC4xMSw1Ni40Ni02LjMxICAgYzQuMDMtMC40Nyw1Ljk3LDAuNDIsNi41OCw1LjJjNy45NSw2My4wMSwxNS45MiwxMjYuMDIsMjQuNDMsMTg4Ljk1YzMuODgsMjguNzUsOC45MSw1Ny4zNSwxMy40OSw4Ni4wMSAgIGMwLjQ0LDIuNzUsMS4zNyw1LjQzLDIuMjQsOC44Yy05LjA3LDAtMTgsMC4xMy0yNi45Mi0wLjA0Yy04LjA3LTAuMTYtMTYuMTMtMC45OC0yNC4xOS0wLjg3Yy00Ljk0LDAuMDctNi43Mi0xLjc3LTcuMTUtNi40OCAgIGMtMS42NC0xOC4yOC0zLjExLTM2LjUzLTUuMzMtNTQuNzljLTEuMjgtMTIuODQtMi42MS0yNS42OC0zLjkzLTM4LjUyYy0wLjUxLTQuOTYtMi40MS03LjQ2LTguMjUtNi43MyAgIGMtMTQuNzcsMS44Ni0yOS41OSwzLjUyLTQ0LjQ0LDQuMzFjLTYuNTMsMC4zNS04LjQxLDIuODktOS41Myw4LjhjLTUuMjgsMjcuOTEtMTAuODgsNTUuNzctMTYuNjksODMuNTcgICBjLTEuODIsOC43MS0yLjI5LDguNzUtMTEuMjMsOC40MUM4NTkuNTEsODExLjk3LDg0OC4yNiw4MTEuMyw4MzUuODYsODEwLjY4eiBNOTUxLjU5LDYxMC40N2MtMC4zNS0zLjYxLTAuODMtOS4yMi0xLjQ1LTE0LjgxICAgYy0wLjkzLTguMzgtMS41NC0xNi44NC0zLjE5LTI1LjA4Yy0wLjQ4LTIuNC0zLjczLTQuOTMtNi4yOS01Ljg5Yy0xLjAzLTAuMzktNC41MywyLjkyLTUuMyw1LjEgICBjLTUuNjIsMTYuMTEtMTAuOCwzMi4zNy0xNi4xOCw0OC41N2MtMS41Myw0LjYxLTAuMTcsNy4xNCw0Ljg3LDYuOTJjNS44Mi0wLjI1LDExLjYzLTAuNzYsMTcuNDUtMS4wOCAgIEM5NTEuNCw2MjMuNjYsOTUyLjQxLDYyMi41Myw5NTEuNTksNjEwLjQ3eiI+PC9wYXRoPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTExNTUuNzksOTI2LjA0Yy05LjQxLDE4LjUtMTguNjcsMzYuNzItMjguMDgsNTUuMjRjLTYuMjYtNC44MS0xMi4yNy05Ljc4LTE4LjY2LTE0LjE5ICAgYy00LjQ2LTMuMDgtOS4zNC01LjYtMTQuMi04LjAzYy0xMy43LTYuODYtMjEuMDYtNS41NS0zMS45MSw1LjM4Yy0xMC4zMiwxMC40LTE1LjY0LDIzLjgzLTIyLjE3LDM2LjUzICAgYy0xLjkzLDMuNzYtMy43MSw3LjYxLTUuMzIsMTEuNTNjLTEuMDEsMi40Ni0xLjU2LDUuMTEtMi44OCw5LjU4YzUuOS0yLjEsOS45OS0zLjQyLDEzLjk4LTVjMTYuNjYtNi42MSwzMy4wMi05Ljk5LDQ5Ljc5LDAuNDEgICBjMTYuNzIsMTAuMzcsMjkuMTksMjQuMjMsMzYuNiw0Mi4yNmMxMi44MSwzMS4xOSwxMS4wOCw2Mi40LTIuNzMsOTIuNzFjLTkuNzcsMjEuNDYtMzcuNDYsMzQuNjEtNjMuMTUsMzEuNSAgIGMtNDUuNTQtNS41LTg0LjA5LTQ0Ljc4LTg3LjcxLTkwLjYxYy0yLjY4LTMzLjk4LDYuMDItNjYuMDYsMjAuNTYtOTYuNDJjNi4yMy0xMywvMTAuMDQtMjUuNDMsMjIuNTQtMzcuMDkgICBjMTcuNDMtMjMuOTEsNDEuMzQtMzcuMTgsNzEuMTktMzcuMzVjMTkuNzItMC4xMiwzOS40NCwxLjY5LDU5LjE2LDIuNjdDMTE1My41NSw5MjUuMTksMTE1NC4zLDkyNS41OSwxMTU1Ljc5LDkyNi4wNHoiICAgIE0xMDIzLjg1LDEwOTUuNzVjMi4zOCwxMS44MSw0LjAxLDIzLjgzLDcuMzMsMzUuMzdjMy41OSwxMi41LDEwLjc1LDIzLjAxLDIyLjcyLDI5LjM3YzkuMSw0LjgzLDE4LjE5LDQuNTIsMjUuOTQtMi4yNiAgIGM0LjQxLTMuODYsOC4zNi04Ljg2LDEwLjg5LTE0LjEzYzExLjE2LTIzLjI1LDguODctNDYuODMtMC44OC02OS43MmMtNC4wMy05LjQ3LTkuNTgtMTguNzMtMTYuMjctMjYuNTIgICBjLTguMTctOS41My0xOS4wOC04LjM3LDI3LjA2LDEuMTVjLTMuNzYsNC40OC03LjM1LDkuMS0xMC45LDEzLjc1QzEwMjguMjQsMTA3Mi40LDEwMjQuOCwxMDgzLjM2LDEwMjMuODUsMTA5NS43NXoiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNDY3Ljk0LDExMzguODZjMS42MSwxNy40MSwzLjE5LDM0LjYyLDQuODgsNTIuODdjLTU0LjQzLTYuOS0xMDguNDQtMy45OC0xNjMuMTIsMi4yMyAgIGM0LjEtMTYuMTksNy43OS0zMS4wMiwxMS42NC00NS44MWMyLjY0LTEwLjEzLDUuNDktMjAuMjEsOC4yNi0zMC4zMWMzLjU3LTEzLDEwLjgxLTIzLjI5LDIyLjQtMzAuMzkgICBjNC4xMy0yLjUzLDcuOTgtNS42LDEyLjMxLTcuNjljMjUtMTIuMDcsNDAuMDktMzMuMDgsNTEuOTYtNTcuMDRjNy4zNy0xNC44OCwxNC42My0yOS44NiwxMi42NC00Ny4xOSAgIGMtMS41Ni0xMy42My03LjMyLTI1LjE4LTExLjgtMzMuMTRjLTEwLjc0LTcuNDUtMjAuMi0zLjM5LTI0LjI1LDguOTFjLTYuMzksMTkuNDMtOS4yNCwzOS4xNy03Ljc2LDU5LjU2ICAgYzAuMSwxLjQtMC4wOSwyLjgyLTAuMjUsNC4yMmMtMC4wNiwwLjU3LTAuNDEsMS4xMS0wLjg4LDIuMjdjLTIuODMtMC41NC01Ljc0LTEuMDEtOC42MS0xLjY1Yy0xMS43OC0yLjY2LTIzLjUtNS42MS0zNS4zNC03Ljk0ICAgYy00LjY4LTAuOTItNi4yOC0yLjc5LTYuMjQtNy41N2MwLjI5LTM2LjU5LDI5LjMyLTY5LjU4LDY2LjkxLTc1LjZjNC45Ny0wLjc5LDEwLjAyLTEuMDEsMTUuMDMtMS42MSAgIGMxNi43LTEuOTcsMjguODYsNS4zOCwzOC4wOSwxOC42YzE2LjAxLDIyLjkxLDIwLjgyLDQ4Ljg0LDE4Ljg3LDc2LjAzYy0yLjUxLDM1LjA0LTE5LjIxLDYyLjI5LTQ4LjA5LDgyLjEyICAgYy0xMC4xNCw2Ljk2LTIxLjE5LDExLjI3LTMzLjY0LDEyLjUxYy00LjExLDAuNDEtOS4zMiwzLjA0LTExLjU2LDYuMzNjLTQuNTUsNi42OS04LjM4LDE0LjIzLTEwLjcyLDIxLjk2ICAgYy0yLjYzLDguNzEsMi4yNCwxNC4zOCwxMS40MywxMy44NWMxMy4wNy0wLjc1LDI2LjIyLTEuOCwzOS4xLTQuMDJDMTQzMC44NSwxMTQ3LjE1LDE0NDkuMjksMTE0Mi43NywxNDY3Ljk0LDExMzguODZ6IjsvPgoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyODIuNCw1MTcuNWMyMi44NC0wLjkzLDQ1LjQtMS44Niw2OC4yNi0yLjc5Yy0xNS44Miw4Ni4wNC0yNi45NiwxNzEuOTktMzMuMDksMjYwLjEyICAgYzguMTMtMS4yNCwxNS4wMS0xLjk5LDIxLjc3LTMuMzZjMjguMjUtNS43Myw1Ni40OC0xMS42MSw4NC42OS0xNy41NWM0LjI4LTAuOSw2LjI1LTAuNDcsNy4xNiw0Ljc2ICAgYzMuMTgsMTguMjEsNy4xNCwzNi4yOCwxMC44OSw1NC44NWMtNTEuODgtMi4xOS0xMDQuMjEtNC40LTE1Ny43NC02LjY1QzEyODguNTgsNzEwLjgxLDEyODcuMjksNjE0LjQ3LDEyODIuNCw1MTcuNXoiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjU5Ljc1LDEwNjkuNDVjMS4yMywxLjU3LDEuNSwyLjE5LDEuOTcsMi40OGMyOC4xLDE3LjMsMzEuNSw0NS4wNywzMC40MSw3NC4wOSAgIGMtMC4yMyw2LjIzLTQuMDgsMTMuNDQtOC40NCwxOC4yMWMtMTguOCwyMC41Ny00MS45OCwzMC43My03MC40MSwyNi43OWMtOS4zOC0xLjMtMTguODgtMS43OS0yOC4zMi0yLjc0ICAgYy03LjEyLTAuNzEtOC4zLTIuMjUtOC4yNC05LjA0YzAuMTEtMTIuNDEsMC4wMy0yNC44MiwwLjAzLTM3LjU3YzExLjAyLDMuNTEsMjAuODIsNy4wOCwzMC44Niw5LjdjOS41OCwyLjUsMTkuNDEsMy45MiwyOS4yNiwwLjg1ICAgYzE3LjAzLTUuMzEsMjQuMzMtMjkuNiwxMy4xLTQzLjUxYy05LjE2LTExLjM1LTIxLjg0LTE1LjUyLTM1LjU2LTE3LjA5Yy00Ljk2LTAuNTctNi45Ny0yLjQyLTcuNzItNy4yNCAgIGMtMS41NC05Ljg1LTMuNjUtMTkuNjEtNS40OC0yOS4xOWM4Ljg0LTMuOTEsMTguNjgtNy45MywyOC4yMy0xMi41NmMyMS43Ny0xMC41NmwyNy41NC0zOC4zNSwyNC44Ni01NC4yNiAgIGMtMi41LTE0Ljg3LTE0LjQtMjQuNTUtMzEuNzQtMjMuOTVjLTEyLjc3LDAuNDUtMjUuNDcsMy40NS0zOC4xNyw1LjUxYy0zLjcxLDAuNi03LjMxLDEuODQtMTMuMTEsMy4zNCAgIGMzLjExLTE0LjEzLDUuNy0yNi44Niw4Ljg5LTM5LjQzYzAuNTYtMi4yMiwzLjQ2LTUuMDcsNS42Ni01LjQ2YzI4LjUtNS4wOCw1Ni43LTYuMzEsODIuNDYsMTAuMjkgICBjMTcuMDEsMTAuOTYsMjYuMiwyNy4wMSwyOC43NSw0Ni45MWMzLTM5LDI5LjY4LTMuMzcsNTUuNi0yNi42Niw3NS43N0MxMjY3LjEzLDEwNjQuMTgsMTI2My41MSwxMDY2LjYxLDEyNTkuNzUsMTA2OS40NXoiPjwvcGF0aD4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNTk1LjU2LDQ2OC4wN2M1LjQsNi4xNiwxMS4wNCwxMi42LDE3LjE4LDE5LjYxYy0xLjEzLDAuNy0yLjkzLDEuNjktNC41OSwyLjg4ICAgYy04LjI2LDUuOTQtMTYuOSwxMS40NS0yNC41OSwxOC4wNmMtNi4xNCw1LjI4LTEyLjYzLDUuOC0yMC40NSw1LjMyQzE1NzQuMjQsNDk4LjIyLDE1ODQuOSw0ODMuMTQsMTU5NS41Niw0NjguMDd6Ij48L3BhdGg+CjwvZz4KPC9zdmc+Cg==";

const AthleLogo = ({ className = "", color = "#0561A4" }: { className?: string; color?: string }) => (
  <svg 
    viewBox="0 0 1682.03 1412.56" 
    className={className} 
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M74.84,1244.31c18.35-73.87,43.17-145.7,69.29-217.07c24.18-66.05,49.13-131.82,74.43-197.45 c15.74-40.82,32.25-81.41,55.56-118.71c12.94-20.7,26.09-41.34,45.62-56.81c8.81-6.98,18.39-12.56,29.42-14.92 c4.8-1.03,10.31-1.86,14.83-0.52c19.38,5.74,36.93,14.97,50.86,30.11c12.75,13.85,11.88,29.33,6.16,45.8 c-6.39,18.44-15.72,35.35-26.01,51.76c-36.89,58.87-67.7,121.01-99.59,182.61c-41.62,80.37-84.09,160.31-126.61,240.21 c-17.73,33.31-37.62,65.38-60.49,95.47c-6.7,8.81-14.4,16.86-21.52,25.37c-1.32,1.57-11.98,18.61-19.96,5.51 C58.87,1302.57,72.52,1253.64,74.84,1244.31z"/>
      <path d="M581.77,91.98c3.5,1.81,6.85,4.06,10.53,5.36c39.36,13.92,62.86,41.77,69.56,82.53 c3.87,23.51-3.94,45.8-18.03,64.3c-28.28,37.13-65.7,55.75-113.5,51.73c-28.49-2.4-52.23-13.55-70.66-35.01 c-29.59-34.46-31.26-76.18-5.29-116.32c16.44-25.41,40.05-40.9,68.97-48.83c3.03-0.83,5.84-2.49,8.75-3.76 C548.65,91.98,565.21,91.98,581.77,91.98z"/>
      <path d="M1617.66,558.43c-22.19,5-44.27,10.58-66.61,14.82c-16.61,3.15-33.53,4.72-50.35,6.66 c-5.77,0.67-8.23,3.13-7.75,8.99c1.37,16.69,2.67,33.39,3.73,50.1c0.32,5.07,2.17,6.98,7.42,6.73c16.13-0.76,32.28-1.1,48.42-1.59 c1.96-0.06,3.93-0.01,6.3-0.01c1.72,17.79,3.39,35.13,5.01,51.96c-21.19,0-41.94,0.19-62.67-0.13c-5.4-0.08-7.34,1.88-7.19,6.89 c0.61,19.97,1.34,39.94,1.72,59.91c0.12,6.25,2.9,7.64,8.65,7.34c25.6-1.33,51.21-2.31,76.82-3.39c2.18-0.09,4.36-0.01,7.94-0.01 c0,11.66,0.15,22.9-0.23,34.11c-0.04,1.15-3.23,3.08-5.02,3.15c-26.02,1-52.04,1.93-78.08,2.47c-17.31,0.36-34.64,0.07-53.32,0.07 c-3.02-91.69-2.24-184.2-2.99-277.66c56.39-3.89,112.29-7.75,168.18-11.6C1617.66,530.97,1617.66,544.7,1617.66,558.43z"/>
      <path d="M712.24,956.35c1.07,13.68-3.93,25.4-9.9,36.68c-13.41,25.3-32.75,45.94-53.13,65.58 c-26.22,25.27-55.22,47.03-85.45,67.3c-42.43,28.46-85.88,55.16-131.37,78.42c-7.78,3.98-16.44,7-25.03,8.37 c-5.4,0.86-12.46-0.67-16.94-3.77c-10.12-7.01-9.59-11.08-4.67-19.52c12.5-21.47,30.18-38.31,48.09-54.9 c39.83-36.88,80.01-73.38,119.91-110.19c12.64-11.66,24.12-24.41,32.64-39.53c4.71-8.37,4.59-11.94-3.95-16.32 c-15.18-7.78-30.79-14.87-46.67-21.13c-28.3-11.15-57.11-21.03-85.32-32.38c-9.78-3.94-18.88-10.05-27.52-16.25 c-18.03-12.95-21.6-22.01-14.47-43.13c5.45-16.13,13.28-31.5,20.74-46.88c4.03-8.3,11.55-13.05,20.4-15.98 c21.42-7.08,42.05-2.81,61,6.67c25.19,12.6,49.75,26.71,73.57,41.78c33.39,21.13,66.07,43.42,98.56,65.92 c7.96,5.51,14.76,13.17,20.76,20.88C709.83,936.14,713.78,945.8,712.24,956.35z"/>
      <path d="M125.42,554.72c0.18-44.64,3.12-89.1,9.32-133.32c1.9-13.55,3.6-27.23,6.89-40.48 c10.1-40.59,37.33-65.01,76.32-76.82c33.85-10.26,68.78-11.42,103.77-8.69c28.93,2.26,57.84,5.18,86.61,8.9 c19.62,2.53,38.68,8.17,56.57,16.85c14.33,6.96,23.98,18.04,27.2,34.17c3.06,15.36-2.32,27.58-14.31,36.69 c-16.58,12.61-36.35,16.89-56.46,19.56c-36.29,4.81-71.4-3.11-106.6-10.16c-11.64-2.33-23.4-4.17-35.19-5.56 c-24.9-2.93-37.29,10.24-42.2,33.25c-8.83,41.37-16.62,83-26.74,124.06c-8.89,36.05-21.49,71.06-41.44,102.78 c-4.07,6.48-10.32,11.67-15.96,17.04c-3,2.86-6.98,1.77-9.07-1.24c-3.96-5.69-8.16-11.55-10.48-17.98 c-6.15-17.05-7.6-35.04-8.13-53.01C125.06,585.42,125.42,570.06,125.42,554.72z"/>
      <path d="M524.7,503.24c-0.23-14.95,2.73-29.3,9.01-42.82c1.79-3.86,4.62-7.82,8.03-10.25 c10.14-7.24,16.92-6.48,24.43,3.5c9.2,12.22,17.06,25.44,26.11,37.78c6.87,9.37,14.26,18.46,22.24,26.9 c5.73,6.07,12.59,7.38,21.32,3.66c22.03-9.63,39.61-24.56,55.01-42.48c29.18-33.96,58-38.22,87.52-101.88 c11.8-13.46,24.66-26.08,37.85-38.19c4.23-3.88,10.96-5.42,16.82-7.04c4.9-1.35,7.66,1.15,6.69,6.69 c-3.28,18.83-5.51,37.9-9.95,56.45c-10.75,44.97-27.97,87.49-52.19,126.97c-24.83,40.48-56.49,74.16-99.79,95.1 c-20.31,9.82-41.38,17.8-64.78,17.46c-21.32-3.31-38.14-9.46-51.8-24.75c-15.58-17.45-23.22-39.02-28.75-61.26 c-3.23-14.99-6.31-30.26-9.41-45.4C523.6,503.47,524.15,503.36,524.7,503.24z"/>
      <path d="M1098.79,820.19c-4.67,0.24-8.48,0.63-12.28,0.6c-14.74-0.1-29.47-0.32-44.21-0.52 c-5.61-0.07-7.24-2.06-6.98-7.81c0.48-10.87,1.02-21.75,1.18-32.63c0.86-56.72,1.41-113.44,2.5-170.15c0.46-24,2-47.98,3-71.98 c0.57-13.87,0.52-13.79-13.04-13.8c-9.89-0.01-19.79-0.04-29.66-0.49c-9.09-0.42-9.4-0.88-10.21-9.81 c-1.29-14.26-2.34-28.55-3.65-42.81c-0.66-7.17-1.68-14.3-2.7-22.74c126.43-3.33,252.42-6.64,379.63-9.99 c-1.56,13.3-2.67,25.48-4.78,37.49c-0.3,1.7-5.38,3.35-8.38,3.67c-13.84,1.44-27.74,2.29-41.61,3.53 c-38.97,3.47-77.53,7.09-116.31,10.53c-31.55,2.8-63.11,5.43-94.66,8.13c-8.99,0.77-9.62,1.23-9.19,10.09 c2.42,49.99,5.27,99.95,7.32,149.95c1.49,36.3,1.96,72.64,2.9,108.96c0.37,14.32,0.76,28.65,1.13,42.97 C1098.84,815.36,1098.79,817.35,1098.79,820.19z"/>
      <path d="M1105.64,524.53c12.37,0,24.41,0,36.97,0c0.11,0.81,0.49,2.14,0.45,3.45c-0.84,26.23-1.62,52.46-2.65,78.69 c-0.68,17.27-0.84,17.22,16.23,17.51c14.74,0.25,29.47,0.72,44.21,0.86c6.92,0.06,7.38-0.93,6.95-7.91 c-1.9-31.02-3.69-62.05-5.5-93.08c-0.09-1.58-0.01-3.16-0.01-5.92c20.17,0,40,0,59.75,0c-5.3,29.23-6.06,59.28-5.87,89.33 c0.42,64.81,1.29,129.62,2.05,194.42c0.11,9.56,0.29,9.66-9.23,9.69c-20.37,0.07-40.74,0.02-62.07,0.02 c1.98-35.28,3.99-71.18,6.06-108.12c-12.13,0-23.33-0.12-34.52,0.19c-1.02,0.03-2.71,2.73-2.82,4.28 c-0.45,6.23-0.59,12.5-0.52,18.75c0.29,27.86,0.64,55.72,1.12,83.58c0.07,3.97-0.42,6.72-5.25,6.69 c-14.89-0.07-29.79-0.03-45.52-0.03c1.78-47.39,5-96.09,5.04-144.8C1110.56,623.33,1107.43,574.53,1105.64,524.53z"/>
      <path d="M835.86,810.68c1.96-11.24,3.58-21.34,5.49-31.39c7.21-38.01,13.68-76.19,22.01-113.95 c9.11-41.25,24.33-80.5,41.33-119.2c4.68-10.66,10.41-13.28,20.53-14.08c18.87-1.48,37.65-4.11,56.46-6.31 c4.03-0.47,5.97,0.42,6.58,5.2c7.95,63.01,15.92,126.02,24.43,188.95c3.88,28.75,8.91,57.35,13.49,86.01 c0.44,2.75,1.37,5.43,2.24,8.8c-9.07,0-18,0.13-26.92-0.04c-8.07-0.16-16.13-0.98-24.19-0.87 c-4.94,0.07-6.72-1.77-7.15-6.48 c-1.64-18.28-3.11-36.53-5.33-54.79c-1.28-12.84-2.61-25.68-3.93-38.52c-0.51-4.96-2.41-7.46-8.25-6.73 c-14.77,1.86-29.59,3.52-44.44,4.31c-6.53,0.35-8.41,2.89-9.53,8.8c-5.28,27.91-10.88,55.77-16.69,83.57 c-1.82,8.71-2.29,8.75-11.23,8.41C859.51,811.97,848.26,811.3,835.86,810.68z M951.59,610.47c-0.35-3.61-0.83-9.22-1.45-14.81 c-0.93-8.38-1.54-16.84-3.19-25.08c-0.48-2.4-3.73-4.93-6.29-5.89c-1.03-0.39-4.53,2.92-5.3,5.1 c-5.62,16.11-10.8,32.37-16.18,48.57c-1.53,4.61-0.17,7.14,4.87,6.92c5.82-0.25,11.63-0.76,17.45-1.08 c1.03,0,2.04,1.13,1.22,13.19z"/>
      <path d="M1155.79,926.04c-9.41,18.5-18.67,36.72-28.08,55.24c-6.26-4.81-12.27-9.78-18.66-14.19 c-4.46-3.08-9.34-5.6-14.2-8.03c-13.7-6.86-21.06-5.55-31.91,5.38c-10.32,10.4-15.64,23.83-22.17,36.53 c-1.93,3.76-3.71,7.61-5.32,11.53c-1.01,2.46-1.56,5.11-2.88,9.58c5.9-2.1,9.99-3.42,13.98-5c16.66-6.61,33.02-9.99,49.79,0.41 c16.72,10.37,29.19,24.23,36.6,42.26c12.81,31.19,11.08,62.4-2.73,92.71c-9.77,21.46-37.46,34.61-63.15,31.5 c-45.54-5.5-84.09-44.78-87.71-90.61c-2.68-33.98,6.02-66.06,20.56-96.42c6.23-13,10.04-25.43,22.54-37.09 c17.43-23.91,41.34-37.18,71.19-37.35c19.72-0.12,39.44,1.69,59.16,2.67C1153.55,925.19,1154.3,925.59,1155.79,926.04z M1023.85,1095.75c2.38,11.81,4.01,23.83,7.33,35.37c3.59,12.5,10.75,23.01,22.72,29.37c9.1,4.83,18.19,4.52,25.94-2.26 c4.41-3.86,8.36-8.86,10.89-14.13c11.16-23.25,8.87-46.83-0.88-69.72c-4.03-9.47-9.58-18.73-16.27-26.52 c-8.17-9.53-19.08-8.37,27.06,1.15c-3.76,4.48-7.35,9.1-10.9,13.75C1028.24,1072.4,1024.8,1083.36,1023.85,1095.75z"/>
      <path d="M1467.94,1138.86c1.61,17.41,3.19,34.62,4.88,52.87c-54.43-6.9-108.44-3.98-163.12,2.23 c4.1-16.19,7.79-31.02,11.64-45.81c2.64-10.13,5.49-20.21,8.26-30.31c3.57-13,10.81-23.29,22.4-30.39 c4.13-2.53,7.98-5.6,12.31-7.69c25-12.07,40.09-33.08,51.96-57.04c7.37-14.88,14.63-29.86,12.64-47.19 c-1.56-13.63-7.32-25.18-11.8-33.14c-10.74-7.45-20.2-3.39-24.25,8.91c-6.39,19.43-9.24,39.17-7.76,59.56 c0.1,1.4-0.09,2.82-0.25,4.22c-0.06,0.57-0.41,1.11-0.88,2.27c-2.83-0.54-5.74-1.01-8.61-1.65 c-11.78-2.66-23.5-5.61-35.34-7.94c-4.68-0.92-6.28-2.79-6.24-7.57c0.29-36.59,29.32-69.58,66.91-75.6c4.97-0.79,10.02-1.01,15.03-1.61 c16.7-1.97,28.86,5.38,38.09,18.6c16.01,22.91,20.82,48.84,18.87,76.03c-2.51,35.04-19.21,62.29-48.09,82.12 c-10.14,6.96-21.19,11.27-33.64,12.51c-4.11,0.41-9.32,3.04-11.56,6.33c-4.55,6.69-8.38,14.23-10.72,21.96 c-2.63,8.71,2.24,14.38,11.43,13.85c13.07-0.75,26.22-1.8,39.1-4.02C1430.85,1147.15,1449.29,1142.77,1467.94,1138.86z"/>
      <path d="M1282.4,517.5c22.84-0.93,45.4-1.86,68.26-2.79c-15.82,86.04-26.96,171.99-33.09,260.12 c8.13-1.24,15.01-1.99,21.77-3.36c28.25-5.73,56.48-11.61,84.69-17.55c4.28-0.9,6.25-0.47,7.16,4.76 c3.18,18.21,7.14,36.28,10.89,54.85c-51.88-2.19-104.21-4.4-157.74-6.65C1288.58,710.81,1287.29,614.47,1282.4,517.5z"/>
      <path d="M1259.75,1069.45c1.23,1.57,1.5,2.19,1.97,2.48c28.1,17.3,31.5,45.07,30.41,74.09 c-0.23,6.23-4.08,13.44-8.44,18.21c-18.8,20.57-41.98,30.73-70.41,26.79c-9.38-1.3-18.88-1.79-28.32-2.74 c-7.12-0.71-8.3-2.25-8.24-9.04c0.11-12.41,0.03-24.82,0.03-37.57c11.02,3.51,20.82,7.08,30.86,9.7c9.58,2.5,19.41,3.92,29.26,0.85 c17.03-5.31,24.33-29.6,13.1-43.51c-9.16-11.35-21.84-15.52-35.56-17.09c-4.96-0.57-6.97-2.42-7.72-7.24 c-1.54-9.85-3.65-19.61-5.48-29.19c8.84-3.91,18.68-7.93,28.23-12.56c21.77-10.56,27.54-38.35,24.86-54.26 c-2.5-14.87-14.4-24.55-31.74-23.95c-12.77,0.45-25.47,3.45-38.17,5.51c-3.71,0.6-7.31,1.84-13.11,3.34 c3.11-14.13,5.7-26.86,8.89-39.43c0.56-2.22,3.46-5.07,5.66-5.46c28.5-5.08,56.7-6.31,82.46,10.29 c17.01,10.96,26.2,27.01,28.75,46.91c3-39,29.68-3.37,55.6-26.66c75.77C1267.13,1064.18,1263.51,1066.61,1259.75,1069.45z"/>
      <path d="M1595.56,468.07c5.4,6.16,11.04,12.6,17.18,19.61c-1.13,0.7-2.93,1.69-4.59,2.88 c-8.26,5.94-16.9,11.45-24.59,18.06c-6.14,5.28-12.63,5.8-20.45,5.32C1574.24,498.22,1584.9,483.14,1595.56,468.07z"/>
    </g>
  </svg>
);

const Logo = ({ className = "", imgClassName = "h-10", logoSrc, inverted = false }: { className?: string; imgClassName?: string; logoSrc?: string | null; inverted?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${imgClassName} transition-transform hover:scale-105`}>
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt="Custom Logo" 
            className="h-full w-auto object-contain"
          />
        ) : (
          <AthleLogo 
            className="h-full w-auto" 
            color={inverted ? "#FFFFFF" : "#0561A4"} 
          />
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [format, setFormat] = useState<Format>(Format.POST);
  const [storyType, setStoryType] = useState<StoryType>(StoryType.INFO);
  const [practice, setPractice] = useState<Practice>(Practice.PISTE);
  const [title, setTitle] = useState("COMPÉTITION RÉGIONALE");
  const [subtitle, setSubtitle] = useState("STADE DES QUINZE SOLS - 2026");
  const [description, setDescription] = useState("");
  const [slides, setSlides] = useState<Slide[]>([
    { 
      id: 's1', 
      specificDiscipline: '', 
      results: [
        { id: '1', name: 'JEAN DUPONT', place: '1ER', perf: '10"84', discipline: '100M' },
        { id: '2', name: 'MARIE CURIE', place: '2EME', perf: '11"20', discipline: '100M' },
      ] 
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogoDataUrl(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      specificDiscipline: '',
      results: [{ id: Date.now().toString() + '-r', name: '', place: '', perf: '', discipline: '' }]
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const addResult = () => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex].results.push({ id: Date.now().toString(), name: '', place: '', perf: '', discipline: '' });
    setSlides(newSlides);
  };

  const removeResult = (id: string) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex].results = newSlides[activeSlideIndex].results.filter(r => r.id !== id);
    setSlides(newSlides);
  };

  const updateResult = (id: string, field: keyof ResultEntry, value: string) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex].results = newSlides[activeSlideIndex].results.map(r => 
      r.id === id ? { ...r, [field]: value.toUpperCase() } : r
    );
    setSlides(newSlides);
  };

  const updateSlideDiscipline = (val: string) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex].specificDiscipline = val.toUpperCase();
    setSlides(newSlides);
  };

  const downloadImage = async () => {
    if (!previewRef.current || isExporting) return;
    setIsExporting(true);
    try {
      // Delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const dimensions = FORMAT_DIMENSIONS[format];
      
      const dataUrl = await toPng(previewRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0055A4',
        canvasWidth: dimensions.width,
        canvasHeight: dimensions.height,
        style: {
          transform: 'scale(1)',
        }
      });
      
      const link = document.createElement('a');
      link.download = `Athle632_${format}_Slide${activeSlideIndex + 1}_${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed', err);
      alert('Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  const downloadAllSlides = async () => {
    if (isExporting) return;
    setIsExporting(true);
    const originalSlideIndex = activeSlideIndex;
    
    try {
      const dimensions = FORMAT_DIMENSIONS[format];
      for (let i = 0; i < slides.length; i++) {
        setActiveSlideIndex(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (previewRef.current) {
          const dataUrl = await toPng(previewRef.current, {
            pixelRatio: 2,
            backgroundColor: '#0055A4',
            canvasWidth: dimensions.width,
            canvasHeight: dimensions.height,
            style: {
              transform: 'scale(1)',
            }
          });
          
          const link = document.createElement('a');
          link.download = `Athle632_${format}_Slide${i + 1}_${Date.now()}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (err) {
      console.error('Batch export failed', err);
    } finally {
      setActiveSlideIndex(originalSlideIndex);
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8fafc] font-open-sans text-slate-900 overflow-hidden">
      {/* Editorial Navbar */}
      <nav className="h-16 bg-athle-blue flex items-center justify-between px-8 text-white border-b border-white/10 shrink-0 z-20">
        <Logo logoSrc={logoDataUrl} inverted={true} />
        <div />
      </nav>

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls */}
        <aside className="w-full md:w-[360px] border-r border-slate-200 bg-white p-8 flex flex-col gap-8 shrink-0 overflow-y-auto">
          <header className="flex items-center justify-between mb-2">
            <Logo className="text-athle-blue" logoSrc={logoDataUrl} />
            <div className="text-[10px] bg-athle-blue/10 text-athle-blue px-2 py-1 rounded font-bold">V1.0</div>
          </header>

          <div className="space-y-8">
            {/* Format Selection */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4 block">01. Format du Visuel</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setFormat(Format.POST)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${format === Format.POST ? 'border-athle-blue bg-athle-blue/5 text-athle-blue' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <Monitor size={20} className="mb-2" />
                  <span className="text-xs font-bold uppercase">Post (1:1)</span>
                </button>
                <button 
                  onClick={() => setFormat(Format.STORY)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all border-2 ${format === Format.STORY ? 'border-athle-blue bg-athle-blue/5 text-athle-blue' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  <Smartphone size={20} className="mb-2" />
                  <span className="text-xs font-bold uppercase">Story (9:16)</span>
                </button>
              </div>
            </div>

            {/* Story Type Selection */}
            {format === Format.STORY && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4 block">01b. Type de Story</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStoryType(StoryType.INFO)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2 ${storyType === StoryType.INFO ? 'border-athle-blue bg-athle-blue/5 text-athle-blue' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                  >
                    <span className="text-xs font-bold uppercase">Information</span>
                  </button>
                  <button 
                    onClick={() => setStoryType(StoryType.RESULTS)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border-2 ${storyType === StoryType.RESULTS ? 'border-athle-blue bg-athle-blue/5 text-athle-blue' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                  >
                    <span className="text-xs font-bold uppercase">Résultats</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Practice selection */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4 block">02. Secteur / Discipline</label>
              <div className="flex flex-col gap-2">
                {Object.entries(Practice).map(([key, value]) => {
                  const isActive = practice === value;
                  const color = PRACTICE_COLORS[value as Practice];
                  return (
                    <button
                      key={value}
                      onClick={() => setPractice(value as Practice)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${isActive ? 'bg-opacity-10 shadow-sm' : 'border-transparent opacity-60 hover:bg-slate-50'}`}
                      style={{ 
                        backgroundColor: isActive ? `${color}20` : undefined,
                        borderColor: isActive ? color : 'transparent'
                      }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className={`text-sm font-bold uppercase ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                        {PRACTICE_LABELS[value as Practice]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Inputs */}
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4 block">03. Informations</label>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600">Titre principal</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-slate-100 border-none rounded focus:ring-2 focus:ring-athle-blue focus:outline-none text-sm font-bold transition-all"
                    placeholder="CHAMPIONNAT RÉGIONAL"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600">Lieu / Date</label>
                  <input 
                    type="text" 
                    value={subtitle} 
                    onChange={(e) => setSubtitle(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-slate-100 border-none rounded focus:ring-2 focus:ring-athle-blue focus:outline-none text-sm font-semibold transition-all"
                    placeholder="Bordeaux | 22 Juin 2024"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600">Texte additionnel (Optionnel)</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-slate-100 border-none rounded focus:ring-2 focus:ring-athle-blue focus:outline-none text-xs font-medium transition-all min-h-[80px]"
                    placeholder="INFOS SUPPLÉMENTAIRES, HORAIRES, ETC."
                  />
                </div>

                {/* Results and slides for Story */}
                {format === Format.STORY && storyType === StoryType.RESULTS && (
                  <div className="pt-4 border-t border-slate-100 space-y-6">
                    {/* Slides management */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Étape 01. Gestion des Slides</label>
                        <button onClick={addSlide} className="text-athle-blue hover:bg-athle-blue/10 p-1 rounded transition-colors flex items-center gap-1 text-[10px] font-bold">
                          <Plus size={14} /> AJOUTER UNE SLIDE
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {slides.map((_, i) => (
                          <div key={i} className="relative group">
                            <button
                              onClick={() => setActiveSlideIndex(i)}
                              className={`w-10 h-10 rounded-lg font-bold text-xs border-2 transition-all ${activeSlideIndex === i ? 'border-athle-blue bg-athle-blue text-white shadow-lg shadow-athle-blue/30' : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-slate-50'}`}
                            >
                              {i + 1}
                            </button>
                            {slides.length > 1 && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); removeSlide(i); }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Plus size={8} className="transform rotate-45" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Slide Results */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tableau des Résultats - Slide {activeSlideIndex + 1}</label>
                        <button onClick={addResult} className="text-athle-blue hover:bg-athle-blue/10 p-1 rounded transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Discipline exacte de la slide (ex: 1500m Hommes)</label>
                          <input 
                            className="w-full px-3 py-2 text-xs bg-slate-50 border-none rounded focus:ring-1 focus:ring-athle-blue focus:outline-none font-bold"
                            placeholder="DISCIPLINE (Optionnel)"
                            value={currentSlide.specificDiscipline}
                            onChange={(e) => updateSlideDiscipline(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          {currentSlide.results.map((res) => (
                            <div key={res.id} className="space-y-1 p-2 bg-slate-50 rounded-lg border border-slate-100 group">
                              <div className="flex gap-1">
                                <input 
                                  className="w-full px-2 py-1.5 text-xs bg-white border border-slate-100 rounded focus:ring-1 focus:ring-athle-blue focus:outline-none font-bold"
                                  placeholder="NOM"
                                  value={res.name}
                                  onChange={(e) => updateResult(res.id, 'name', e.target.value)}
                                />
                                <input 
                                  className="w-16 px-2 py-1.5 text-xs bg-white border border-slate-100 rounded focus:ring-1 focus:ring-athle-blue focus:outline-none text-center font-bold"
                                  placeholder="PLACE"
                                  value={res.place}
                                  onChange={(e) => updateResult(res.id, 'place', e.target.value)}
                                />
                                <button onClick={() => removeResult(res.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                              <div className="flex gap-1">
                                <input 
                                  className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-100 rounded focus:ring-1 focus:ring-athle-blue focus:outline-none"
                                  placeholder="PERFORMANCE"
                                  value={res.perf}
                                  onChange={(e) => updateResult(res.id, 'perf', e.target.value)}
                                />
                                <input 
                                  className="flex-1 px-2 py-1.5 text-xs bg-white border border-slate-100 rounded focus:ring-1 focus:ring-athle-blue focus:outline-none"
                                  placeholder="DISCIPLINE (Si différent)"
                                  value={res.discipline || ''}
                                  onChange={(e) => updateResult(res.id, 'discipline', e.target.value)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Logo & Image Upload */}
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div 
                    onClick={() => logoInputRef.current?.click()}
                    className={`aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${logoDataUrl ? 'border-athle-blue/50 bg-athle-blue/5 shadow-inner' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}
                  >
                    <input type="file" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    <Trophy size={20} className={logoDataUrl ? 'text-athle-blue' : 'text-slate-400'} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase text-center px-2">
                       {logoDataUrl ? 'Changer Logo' : 'Logo Perso'}
                    </span>
                    {logoDataUrl && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setLogoDataUrl(null); }}
                        className="text-[9px] text-red-500 font-bold hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${image ? 'border-athle-blue/50 bg-athle-blue/5 shadow-inner' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    <ImageIcon size={20} className={image ? 'text-athle-blue' : 'text-slate-400'} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase text-center px-2">
                      {image ? 'Changer Fond' : 'Image Fond'}
                    </span>
                    {image && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setImage(null); }}
                        className="text-[9px] text-red-500 font-bold hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 flex flex-col gap-2">
            {format === Format.STORY && storyType === StoryType.RESULTS && slides.length > 1 && (
              <button 
                disabled={isExporting}
                onClick={downloadAllSlides}
                className="w-full bg-slate-100 text-athle-blue py-3 rounded-xl font-bold flex items-center justify-center gap-2 border border-athle-blue/20 hover:bg-slate-200 transition-all disabled:opacity-50 text-sm"
              >
                <Download size={18} />
                TÉLÉCHARGER TOUTES LES SLIDES ({slides.length})
              </button>
            )}
            <button 
              disabled={isExporting}
              onClick={downloadImage}
              className="w-full bg-athle-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-athle-blue/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              <Download size={20} strokeWidth={2.5} />
              {isExporting ? 'GÉNÉRATION...' : format === Format.STORY && storyType === StoryType.RESULTS ? 'TÉLÉCHARGER SLIDE ACTUELLE' : 'TÉLÉCHARGER LE PNG'}
            </button>
          </div>
        </aside>

        {/* Preview Area */}
        <section className="flex-1 bg-slate-200 p-8 md:p-12 flex items-center justify-center overflow-auto shadow-inner">
          <div 
            className={`relative bg-white shadow-2xl transition-all duration-500 origin-center ${FORMAT_DIMENSIONS[format].aspect}`}
            style={{ 
              width: format === Format.POST ? 'min(520px, 95vw)' : 'min(360px, 80vw)',
              borderRadius: '2px'
            }}
          >
            {/* Captureable Component */}
            <div 
              ref={previewRef}
              className="w-full h-full relative overflow-hidden bg-athle-blue select-none"
            >
              {/* Background Image / Pattern */}
              {image ? (
                <div className="absolute inset-0 bg-athle-blue z-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30" 
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-athle-blue/80 via-athle-blue/40 to-transparent" />
                </div>
              ) : (
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 opacity-20" 
                    style={{ 
                      backgroundImage: 'repeating-linear-gradient(45deg, #004488, #004488 10px, #0055A4 10px, #0055A4 20px)'
                    }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-athle-blue via-athle-blue/60 to-transparent" />
                </div>
              )}

              {/* Dynamic Year Stamp */}
              <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none select-none z-0">
                <span className="text-[120px] font-bebas leading-[0.8] text-white">2026</span>
              </div>

              {/* Layout Content */}
              <div className={`absolute inset-0 p-[8%] flex flex-col text-white ${format === Format.STORY && storyType === StoryType.INFO ? 'text-center' : ''}`}>
                {/* Top Logo Strip */}
                <div className="absolute top-[8%] left-[8%] z-10">
                  <Logo imgClassName="h-16 md:h-20" logoSrc={logoDataUrl} inverted={true} />
                </div>

                {/* Content Container - Pushes content to bottom or center */}
                <div className={`flex flex-col flex-1 ${format === Format.STORY && storyType === StoryType.INFO ? 'justify-center' : 'justify-end'}`}>
                  
                  {/* Main Content Area */}
                  <div className={`space-y-1 ${format === Format.STORY && storyType === StoryType.INFO ? 'mb-0' : 'mb-[5%]'}`}>
                  <div className={`flex items-center gap-2 mb-3 ${format === Format.STORY && storyType === StoryType.INFO ? 'justify-center' : ''}`}>
                    <div className="h-px flex-1 bg-white/30" />
                    <span 
                      className="text-[11px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: PRACTICE_COLORS[practice] }}
                    >
                      {currentSlide?.specificDiscipline || subtitle || "VOTRE ÉVÉNEMENT"}
                    </span>
                    <div className="h-px flex-1 bg-white/30" />
                  </div>
                  
                  {/* Title only on the first slide or for non-results formats */}
                  {(activeSlideIndex === 0 || !(format === Format.STORY && storyType === StoryType.RESULTS)) && (
                    <h2 
                      className="font-bebas font-black leading-[1.1] tracking-tight"
                      style={{ 
                        fontSize: format === Format.POST ? 'min(72px, 15vw)' : 'min(56px, 12vw)'
                      }}
                    >
                      {title ? title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {word}
                          {i === 0 && title.split(' ').length > 1 ? <br/> : ' '}
                        </React.Fragment>
                      )) : "COMPÉTITION"}
                    </h2>
                  )}

                  {/* Description only for non-results or info story */}
                  {description && !(format === Format.STORY && storyType === StoryType.RESULTS) && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-white/80 text-xs font-semibold mt-4 line-clamp-4 leading-relaxed ${format === Format.STORY && storyType === StoryType.INFO ? 'mx-auto text-center max-w-[80%]' : 'max-w-[90%]'}`}
                    >
                      {description}
                    </motion.p>
                  )}

                  {/* Results for Story */}
                  {format === Format.STORY && storyType === StoryType.RESULTS && (
                    <div className="mt-8 space-y-3">
                      {currentSlide.results.map((res, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={res.id} 
                          className="flex items-center justify-between border-b border-white/20 pb-2"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-black leading-none">{res.place}</span>
                              <span className="text-base font-bold uppercase">{res.name}</span>
                            </div>
                            {res.discipline && (
                              <span className="text-[11px] font-black tracking-widest uppercase mt-0.5" style={{ color: PRACTICE_COLORS[practice] }}>{res.discipline}</span>
                            )}
                          </div>
                          <span className="font-bebas text-2xl" style={{ color: PRACTICE_COLORS[practice] }}>{res.perf}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  </div>
                </div>

                {/* Footer Simple Discipline (Always at the bottom) */}
                <div className={`mt-auto pt-8 flex items-center gap-4 ${format === Format.STORY && storyType === StoryType.INFO ? 'justify-center' : ''}`}>
                  <div className="h-10 px-6 flex items-center justify-center rounded-sm shadow-lg whitespace-nowrap" style={{ backgroundColor: PRACTICE_COLORS[practice] }}>
                      <span className="font-bebas text-2xl text-athle-blue tracking-wider">
                        {currentSlide?.specificDiscipline || PRACTICE_LABELS[practice]}
                      </span>
                  </div>
                  
                  {/* Pagination for multi-slide stories */}
                  {format === Format.STORY && storyType === StoryType.RESULTS && slides.length > 1 && (
                    <div className="font-bebas text-3xl text-white drop-shadow-md">
                      {activeSlideIndex + 1} / {slides.length}
                    </div>
                  )}

                  {!(format === Format.STORY && storyType === StoryType.INFO) && <div className="flex-1 h-px bg-white/30" />}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

