package com.studymate.studymate.service;

import com.studymate.studymate.dto.request.JoinRequestCreateRequest;
import com.studymate.studymate.dto.request.JoinRequestResponse;

import java.util.List;

public interface JoinRequestService {

    JoinRequestResponse apply(Long userId, Long groupId, JoinRequestCreateRequest request);

    List<JoinRequestResponse> getGroupRequests(Long userId, Long groupId);

    List<JoinRequestResponse> getMyRequests(Long userId);

    JoinRequestResponse accept(Long userId, Long requestId);

    JoinRequestResponse reject(Long userId, Long requestId);

    JoinRequestResponse cancel(Long userId, Long requestId);
}
