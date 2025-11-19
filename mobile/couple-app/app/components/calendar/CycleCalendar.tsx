import React, { useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import type { CycleDayInfo, CycleDayType } from "../../types/cycle";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
    month: Date;
    selectedDate: Date | null;
    onSelectDate: (d: Date) => void;
    onChangeMonth: (dir: "prev" | "next") => void;
    cycleDays: CycleDayInfo[];
};

type GridDay = {
    date: Date | null; // null = empty cell
    isToday: boolean;
    isSelected: boolean;
    type?: CycleDayType;
};

export const CycleCalendar: React.FC<Props> = ({
    month,
    selectedDate,
    onSelectDate,
    onChangeMonth,
    cycleDays,
}) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const map = useMemo(() => {
        const m = new Map<string, CycleDayInfo>();
        cycleDays.forEach((d) => m.set(d.date, d));
        return m;
    }, [cycleDays]);

    const grid: GridDay[] = useMemo(() => {
        const firstOfMonth = new Date(year, monthIndex, 1);
        const firstWeekday = firstOfMonth.getDay();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        const today = new Date();
        const cells: GridDay[] = [];

        // leading empty cells
        for (let i = 0; i < firstWeekday; i++) {
            cells.push({ date: null, isToday: false, isSelected: false });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const d = new Date(year, monthIndex, day);
            const iso = toIso(d);
            const info = map.get(iso);
            const isToday =
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate();

            const isSelected = !!(
                selectedDate &&
                d.getFullYear() === selectedDate.getFullYear() &&
                d.getMonth() === selectedDate.getMonth() &&
                d.getDate() === selectedDate.getDate()
            );

            cells.push({
                date: d,
                isToday,
                isSelected,
                type: info?.type,
            });
        }

        return cells;
    }, [year, monthIndex, selectedDate, map]);

    const monthLabel = month.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    return (
        <View style={styles.card}>
            {/* header with month + arrows */}
            <View style={styles.monthHeader}>
                <TouchableOpacity onPress={() => onChangeMonth("prev")}>
                    <Text style={styles.monthNav}>{`‹`}</Text>
                </TouchableOpacity>
                <Text style={styles.monthTitle}>{monthLabel}</Text>
                <TouchableOpacity onPress={() => onChangeMonth("next")}>
                    <Text style={styles.monthNav}>{`›`}</Text>
                </TouchableOpacity>
            </View>

            {/* weekday labels */}
            <View style={styles.weekRow}>
                {weekdayLabels.map((label) => (
                    <Text key={label} style={styles.weekday}>
                        {label}
                    </Text>
                ))}
            </View>

            {/* grid */}
            <View style={styles.grid}>
                {grid.map((cell, index) => {
                    if (!cell.date) {
                        return <View key={index} style={styles.dayCell} />;
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayCell,
                                cell.isSelected && styles.dayCellSelected,
                            ]}
                            onPress={() => onSelectDate(cell.date!)}
                        >
                            <Text
                                style={[
                                    styles.dayLabel,
                                    cell.isToday && styles.dayToday,
                                    cell.isSelected && styles.dayLabelSelected,
                                ]}
                            >
                                {cell.date.getDate()}
                            </Text>
                            {cell.type && (
                                <View
                                    style={[
                                        styles.dot,
                                        { backgroundColor: dotColor(cell.type) },
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const toIso = (d: Date) =>
    d.toISOString().slice(0, 10); // YYYY-MM-DD

const dotColor = (type: CycleDayType) => {
    switch (type) {
        case "PERIOD":
            return colors.primaryDark;
        case "FERTILE":
            return colors.accentMint;
        case "OVULATION":
            return colors.accentPurple;
        case "SAFE":
        default:
            return "#D3D3E1";
    }
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardBg,
        borderRadius: 20,
        padding: spacing.md,
    },
    monthHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },
    monthTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.textMain,
    },
    monthNav: {
        fontSize: 20,
        color: colors.accentPurple,
        paddingHorizontal: 8,
    },
    weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: spacing.sm,
    },
    weekday: {
        flex: 1,
        textAlign: "center",
        fontSize: 11,
        color: colors.textSecondary,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    dayCell: {
        width: `${100 / 7}%`,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    dayCellSelected: {
        borderRadius: 999,
        backgroundColor: colors.primaryLight,
    },
    dayLabel: {
        fontSize: 14,
        color: colors.textMain,
    },
    dayLabelSelected: {
        fontWeight: "700",
        color: colors.primaryDark,
    },
    dayToday: {
        textDecorationLine: "underline",
    },
    dot: {
        marginTop: 3,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
