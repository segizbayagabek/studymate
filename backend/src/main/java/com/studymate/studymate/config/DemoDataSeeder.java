package com.studymate.studymate.config;

import com.studymate.studymate.entity.KnowledgeLevel;
import com.studymate.studymate.entity.StudyGroup;
import com.studymate.studymate.entity.StudyPlace;
import com.studymate.studymate.entity.StudyPreference;
import com.studymate.studymate.entity.User;
import com.studymate.studymate.repository.StudyGroupRepository;
import com.studymate.studymate.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Component
public class DemoDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final StudyGroupRepository groupRepository;

    public DemoDataSeeder(UserRepository userRepository, StudyGroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        createUser("Aliya Tursyn", "250118021");
        User dana = createUser("Dana S.", "240118015");
        User arman = createUser("Arman B.", "230118044");
        User madina = createUser("Madina K.", "250302011");

        LocalDate today = LocalDate.now();

        groupRepository.save(new StudyGroup(
                dana,
                "Integration techniques before Friday's quiz",
                "Working through the practice set together, then explaining solutions out loud to each other. Bring your own paper.",
                "Calculus II",
                "MATH 161",
                StudyPlace.LIBRARY,
                "2nd floor, table 14",
                today,
                LocalTime.of(14, 0),
                LocalTime.of(16, 0),
                KnowledgeLevel.INTERMEDIATE,
                Set.of(StudyPreference.QUIET_WORK),
                4));

        groupRepository.save(new StudyGroup(
                arman,
                "Pair-explaining graph traversal",
                "Whiteboard session. Everyone teaches one algorithm to the group: BFS, DFS, Dijkstra.",
                "Data Structures",
                "CS 204",
                StudyPlace.TOP_FLOOR,
                "Study pod 3",
                today,
                LocalTime.of(16, 0),
                LocalTime.of(18, 0),
                KnowledgeLevel.INTERMEDIATE,
                Set.of(StudyPreference.TALKATIVE),
                4));

        groupRepository.save(new StudyGroup(
                madina,
                "Essay peer review over coffee",
                "Bring a draft. We read each other's introductions and thesis statements aloud.",
                "Academic English",
                "ENG 102",
                StudyPlace.CANTEEN,
                "Window side",
                today.plusDays(1),
                LocalTime.of(11, 0),
                LocalTime.of(13, 0),
                KnowledgeLevel.BEGINNER,
                Set.of(StudyPreference.WOMEN_ONLY),
                3));
    }

    private User createUser(String name, String studentId) {
        return userRepository.save(new User(name, studentId + "@sdu.edu.kz"));
    }
}
